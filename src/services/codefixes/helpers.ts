/* @internal */
namespace ts.codefix {
    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @param importAdder If provided, type annotations will use identifier type references instead of ImportTypeNodes, and the missing imports will be added to the importAdder.
     * @returns Empty string iff there are no member insertions.
     */
    export function createMissingMemberNodes(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: readonly Symbol[], context: TypeConstructionContext, preferences: UserPreferences, importAdder: ImportAdder | undefined, addClassElement: (node: ClassElement) => void): void {
        const classMembers = classDeclaration.symbol.members!;
        for (const symbol of possiblyMissingSymbols) {
            if (!classMembers.has(symbol.escapedName)) {
                addNewNodeForMemberSymbol(symbol, classDeclaration, context, preferences, importAdder, addClassElement);
            }
        }
    }

    export function getNoopSymbolTrackerWithResolver(context: TypeConstructionContext): SymbolTracker {
        return {
            trackSymbol: noop,
            moduleResolverHost: getModuleSpecifierResolverHost(context.program, context.host),
        };
    }

    export interface TypeConstructionContext {
        program: Program;
        host: LanguageServiceHost;
    }

    /**
     * @returns Empty string iff there we can't figure out a representation for `symbol` in `enclosingDeclaration`.
     */
    function addNewNodeForMemberSymbol(symbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, context: TypeConstructionContext, preferences: UserPreferences, importAdder: ImportAdder | undefined, addClassElement: (node: Node) => void): void {
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return undefined;
        }
        const checker = context.program.getTypeChecker();
        const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
        const declaration = declarations[0];
        const name = getSynthesizedDeepClone(getNameOfDeclaration(declaration), /*includeTrivia*/ false) as PropertyName;
        const visibilityModifier = createVisibilityModifier(getEffectiveModifierFlags(declaration));
        const modifiers = visibilityModifier ? factory.createNodeArray([visibilityModifier]) : undefined;
        const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
        const optional = !!(symbol.flags & SymbolFlags.Optional);
        const ambient = !!(enclosingDeclaration.flags & NodeFlags.Ambient);

        switch (declaration.kind) {
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const flags = preferences.quotePreference === "single" ? NodeBuilderFlags.UseSingleQuotesForStringLiteralType : undefined;
                let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context));
                if (importAdder) {
                    const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(typeNode, type, scriptTarget);
                    if (importableReference) {
                        typeNode = importableReference.typeReference;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                addClassElement(factory.createPropertyDeclaration(
                    /*decorators*/ undefined,
                    modifiers,
                    name,
                    optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                    typeNode,
                    /*initializer*/ undefined));
                break;
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor: {
                let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context));
                const allAccessors = getAllAccessorDeclarations(declarations, declaration as AccessorDeclaration);
                const orderedAccessors = allAccessors.secondAccessor
                    ? [allAccessors.firstAccessor, allAccessors.secondAccessor]
                    : [allAccessors.firstAccessor];
                if (importAdder) {
                    const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(typeNode, type, scriptTarget);
                    if (importableReference) {
                        typeNode = importableReference.typeReference;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                for (const accessor of orderedAccessors) {
                    if (isGetAccessorDeclaration(accessor)) {
                        addClassElement(factory.createGetAccessorDeclaration(
                            /*decorators*/ undefined,
                            modifiers,
                            name,
                            emptyArray,
                            typeNode,
                            ambient ? undefined : createStubbedMethodBody(preferences)));
                    }
                    else {
                        Debug.assertNode(accessor, isSetAccessorDeclaration, "The counterpart to a getter should be a setter");
                        const parameter = getSetAccessorValueParameter(accessor);
                        const parameterName = parameter && isIdentifier(parameter.name) ? idText(parameter.name) : undefined;
                        addClassElement(factory.createSetAccessorDeclaration(
                            /*decorators*/ undefined,
                            modifiers,
                            name,
                            createDummyParameters(1, [parameterName], [typeNode], 1, /*inJs*/ false),
                            ambient ? undefined : createStubbedMethodBody(preferences)));
                    }
                }
                break;
            }
            case SyntaxKind.MethodSignature:
            case SyntaxKind.MethodDeclaration:
                // The signature for the implementation appears as an entry in `signatures` iff
                // there is only one signature.
                // If there are overloads and an implementation signature, it appears as an
                // extra declaration that isn't a signature for `type`.
                // If there is more than one overload but no implementation signature
                // (eg: an abstract method or interface declaration), there is a 1-1
                // correspondence of declarations and signatures.
                const signatures = checker.getSignaturesOfType(type, SignatureKind.Call);
                if (!some(signatures)) {
                    break;
                }

                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1, "One declaration implies one signature");
                    const signature = signatures[0];
                    outputMethod(signature, modifiers, name, ambient ? undefined : createStubbedMethodBody(preferences));
                    break;
                }

                for (const signature of signatures) {
                    // Need to ensure nodes are fresh each time so they can have different positions.
                    outputMethod(signature, getSynthesizedDeepClones(modifiers, /*includeTrivia*/ false), getSynthesizedDeepClone(name, /*includeTrivia*/ false));
                }

                if (!ambient) {
                    if (declarations.length > signatures.length) {
                        const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration)!;
                        outputMethod(signature, modifiers, name, createStubbedMethodBody(preferences));
                    }
                    else {
                        Debug.assert(declarations.length === signatures.length, "Declarations and signatures should match count");
                        addClassElement(createMethodImplementingSignatures(signatures, name, optional, modifiers, preferences));
                    }
                }
                break;
        }

        function outputMethod(signature: Signature, modifiers: NodeArray<Modifier> | undefined, name: PropertyName, body?: Block): void {
            const method = signatureToMethodDeclaration(context, signature, enclosingDeclaration, modifiers, name, optional, body, importAdder);
            if (method) addClassElement(method);
        }
    }

    function signatureToMethodDeclaration(
        context: TypeConstructionContext,
        signature: Signature,
        enclosingDeclaration: ClassLikeDeclaration,
        modifiers: NodeArray<Modifier> | undefined,
        name: PropertyName,
        optional: boolean,
        body: Block | undefined,
        importAdder: ImportAdder | undefined,
    ): MethodDeclaration | undefined {
        const program = context.program;
        const checker = program.getTypeChecker();
        const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
        const signatureDeclaration = <MethodDeclaration>checker.signatureToSignatureDeclaration(signature, SyntaxKind.MethodDeclaration, enclosingDeclaration, NodeBuilderFlags.NoTruncation | NodeBuilderFlags.SuppressAnyReturnType, getNoopSymbolTrackerWithResolver(context));
        if (!signatureDeclaration) {
            return undefined;
        }

        let typeParameters = signatureDeclaration.typeParameters;
        let parameters = signatureDeclaration.parameters;
        let type = signatureDeclaration.type;
        if (importAdder) {
            if (typeParameters) {
                const newTypeParameters = sameMap(typeParameters, (typeParameterDecl, i) => {
                    const typeParameter = signature.typeParameters![i];
                    let constraint = typeParameterDecl.constraint;
                    let defaultType = typeParameterDecl.default;
                    if (constraint) {
                        const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(constraint, typeParameter.constraint, scriptTarget);
                        if (importableReference) {
                            constraint = importableReference.typeReference;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    if (defaultType) {
                        const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(defaultType, typeParameter.default, scriptTarget);
                        if (importableReference) {
                            defaultType = importableReference.typeReference;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    return factory.updateTypeParameterDeclaration(
                        typeParameterDecl,
                        typeParameterDecl.name,
                        constraint,
                        defaultType
                    );
                });
                if (typeParameters !== newTypeParameters) {
                    typeParameters = setTextRange(factory.createNodeArray(newTypeParameters, typeParameters.hasTrailingComma), typeParameters);
                }
            }
            const newParameters = sameMap(parameters, (parameterDecl, i) => {
                const parameter = signature.parameters[i];
                const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(parameterDecl.type, checker.getTypeAtLocation(parameter.valueDeclaration), scriptTarget);
                let type = parameterDecl.type;
                if (importableReference) {
                    type = importableReference.typeReference;
                    importSymbols(importAdder, importableReference.symbols);
                }
                return factory.updateParameterDeclaration(
                    parameterDecl,
                    parameterDecl.decorators,
                    parameterDecl.modifiers,
                    parameterDecl.dotDotDotToken,
                    parameterDecl.name,
                    parameterDecl.questionToken,
                    type,
                    parameterDecl.initializer
                );
            });
            if (parameters !== newParameters) {
                parameters = setTextRange(factory.createNodeArray(newParameters, parameters.hasTrailingComma), parameters);
            }
            if (type) {
                const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(type, signature.resolvedReturnType, scriptTarget);
                if (importableReference) {
                    type = importableReference.typeReference;
                    importSymbols(importAdder, importableReference.symbols);
                }
            }
        }

        return factory.updateMethodDeclaration(
            signatureDeclaration,
            /*decorators*/ undefined,
            modifiers,
            signatureDeclaration.asteriskToken,
            name,
            optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
            typeParameters,
            parameters,
            type,
            body
        );
    }

    export function createMethodFromCallExpression(
        context: CodeFixContextBase,
        importAdder: ImportAdder,
        call: CallExpression,
        methodName: string,
        modifierFlags: ModifierFlags,
        contextNode: Node,
        inJs: boolean
    ): MethodDeclaration {
        const body = !isInterfaceDeclaration(contextNode);
        const { typeArguments, arguments: args, parent } = call;
        const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
        const checker = context.program.getTypeChecker();
        const tracker = getNoopSymbolTrackerWithResolver(context);
        const types = map(args, arg =>
            typeToAutoImportableTypeNode(checker, importAdder, checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(arg)), contextNode, scriptTarget, /*flags*/ undefined, tracker));
        const names = map(args, arg =>
            isIdentifier(arg) ? arg.text : isPropertyAccessExpression(arg) && isIdentifier(arg.name) ? arg.name.text : undefined);
        const contextualType = checker.getContextualType(call);
        const returnType = (inJs || !contextualType) ? undefined : checker.typeToTypeNode(contextualType, contextNode, /*flags*/ undefined, tracker);
        return factory.createMethodDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ modifierFlags ? factory.createNodeArray(factory.createModifiersFromModifierFlags(modifierFlags)) : undefined,
            /*asteriskToken*/ isYieldExpression(parent) ? factory.createToken(SyntaxKind.AsteriskToken) : undefined,
            methodName,
            /*questionToken*/ undefined,
            /*typeParameters*/ inJs ? undefined : map(typeArguments, (_, i) =>
                factory.createTypeParameterDeclaration(CharacterCodes.T + typeArguments!.length - 1 <= CharacterCodes.Z ? String.fromCharCode(CharacterCodes.T + i) : `T${i}`)),
            /*parameters*/ createDummyParameters(args.length, names, types, /*minArgumentCount*/ undefined, inJs),
            /*type*/ returnType,
            body ? createStubbedMethodBody(context.preferences) : undefined);
    }

    export function typeToAutoImportableTypeNode(checker: TypeChecker, importAdder: ImportAdder, type: Type, contextNode: Node, scriptTarget: ScriptTarget, flags?: NodeBuilderFlags, tracker?: SymbolTracker): TypeNode | undefined {
        const typeNode = checker.typeToTypeNode(type, contextNode, flags, tracker);
        if (typeNode && isImportTypeNode(typeNode)) {
            const importableReference = tryGetAutoImportableReferenceFromImportTypeNode(typeNode, type, scriptTarget);
            if (importableReference) {
                importSymbols(importAdder, importableReference.symbols);
                return importableReference.typeReference;
            }
        }
        return typeNode;
    }

    function createDummyParameters(argCount: number, names: (string | undefined)[] | undefined, types: (TypeNode | undefined)[] | undefined, minArgumentCount: number | undefined, inJs: boolean): ParameterDeclaration[] {
        const parameters: ParameterDeclaration[] = [];
        for (let i = 0; i < argCount; i++) {
            const newParameter = factory.createParameterDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ names && names[i] || `arg${i}`,
                /*questionToken*/ minArgumentCount !== undefined && i >= minArgumentCount ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                /*type*/ inJs ? undefined : types && types[i] || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                /*initializer*/ undefined);
            parameters.push(newParameter);
        }
        return parameters;
    }

    function createMethodImplementingSignatures(
        signatures: readonly Signature[],
        name: PropertyName,
        optional: boolean,
        modifiers: readonly Modifier[] | undefined,
        preferences: UserPreferences,
    ): MethodDeclaration {
        /** This is *a* signature with the maximal number of arguments,
         * such that if there is a "maximal" signature without rest arguments,
         * this is one of them.
         */
        let maxArgsSignature = signatures[0];
        let minArgumentCount = signatures[0].minArgumentCount;
        let someSigHasRestParameter = false;
        for (const sig of signatures) {
            minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
            if (signatureHasRestParameter(sig)) {
                someSigHasRestParameter = true;
            }
            if (sig.parameters.length >= maxArgsSignature.parameters.length && (!signatureHasRestParameter(sig) || signatureHasRestParameter(maxArgsSignature))) {
                maxArgsSignature = sig;
            }
        }
        const maxNonRestArgs = maxArgsSignature.parameters.length - (signatureHasRestParameter(maxArgsSignature) ? 1 : 0);
        const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map(symbol => symbol.name);

        const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, /* types */ undefined, minArgumentCount, /*inJs*/ false);

        if (someSigHasRestParameter) {
            const anyArrayType = factory.createArrayTypeNode(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
            const restParameter = factory.createParameterDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                factory.createToken(SyntaxKind.DotDotDotToken),
                maxArgsParameterSymbolNames[maxNonRestArgs] || "rest",
                /*questionToken*/ maxNonRestArgs >= minArgumentCount ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                anyArrayType,
                /*initializer*/ undefined);
            parameters.push(restParameter);
        }

        return createStubbedMethod(
            modifiers,
            name,
            optional,
            /*typeParameters*/ undefined,
            parameters,
            /*returnType*/ undefined,
            preferences);
    }

    function createStubbedMethod(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        optional: boolean,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        returnType: TypeNode | undefined,
        preferences: UserPreferences
    ): MethodDeclaration {
        return factory.createMethodDeclaration(
            /*decorators*/ undefined,
            modifiers,
            /*asteriskToken*/ undefined,
            name,
            optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
            typeParameters,
            parameters,
            returnType,
            createStubbedMethodBody(preferences));
    }

    function createStubbedMethodBody(preferences: UserPreferences): Block {
        return factory.createBlock(
            [factory.createThrowStatement(
                factory.createNewExpression(
                    factory.createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    // TODO Handle auto quote preference.
                    [factory.createStringLiteral("Method not implemented.", /*isSingleQuote*/ preferences.quotePreference === "single")]))],
            /*multiline*/ true);
    }

    function createVisibilityModifier(flags: ModifierFlags): Modifier | undefined {
        if (flags & ModifierFlags.Public) {
            return factory.createToken(SyntaxKind.PublicKeyword);
        }
        else if (flags & ModifierFlags.Protected) {
            return factory.createToken(SyntaxKind.ProtectedKeyword);
        }
        return undefined;
    }

    export function setJsonCompilerOptionValues(
        changeTracker: textChanges.ChangeTracker,
        configFile: TsConfigSourceFile,
        options: [string, Expression][]
    ) {
        const tsconfigObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
        if (!tsconfigObjectLiteral) return undefined;

        const compilerOptionsProperty = findJsonProperty(tsconfigObjectLiteral, "compilerOptions");
        if (compilerOptionsProperty === undefined) {
            changeTracker.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createJsonPropertyAssignment(
                "compilerOptions",
                factory.createObjectLiteralExpression(options.map(([optionName, optionValue]) => createJsonPropertyAssignment(optionName, optionValue)), /*multiLine*/ true)));
            return;
        }

        const compilerOptions = compilerOptionsProperty.initializer;
        if (!isObjectLiteralExpression(compilerOptions)) {
            return;
        }

        for (const [optionName, optionValue] of options) {
            const optionProperty = findJsonProperty(compilerOptions, optionName);
            if (optionProperty === undefined) {
                changeTracker.insertNodeAtObjectStart(configFile, compilerOptions, createJsonPropertyAssignment(optionName, optionValue));
            }
            else {
                changeTracker.replaceNode(configFile, optionProperty.initializer, optionValue);
            }
        }
    }

    export function setJsonCompilerOptionValue(
        changeTracker: textChanges.ChangeTracker,
        configFile: TsConfigSourceFile,
        optionName: string,
        optionValue: Expression,
    ) {
        setJsonCompilerOptionValues(changeTracker, configFile, [[optionName, optionValue]]);
    }

    export function createJsonPropertyAssignment(name: string, initializer: Expression) {
        return factory.createPropertyAssignment(factory.createStringLiteral(name), initializer);
    }

    export function findJsonProperty(obj: ObjectLiteralExpression, name: string): PropertyAssignment | undefined {
        return find(obj.properties, (p): p is PropertyAssignment => isPropertyAssignment(p) && !!p.name && isStringLiteral(p.name) && p.name.text === name);
    }

    /**
     * Given an ImportTypeNode 'import("./a").SomeType<import("./b").OtherType<...>>',
     * returns an equivalent type reference node with any nested ImportTypeNodes also replaced
     * with type references, and a list of symbols that must be imported to use the type reference.
     */
    export function tryGetAutoImportableReferenceFromImportTypeNode(importTypeNode: TypeNode | undefined, type: Type | undefined, scriptTarget: ScriptTarget) {
        if (importTypeNode && isLiteralImportTypeNode(importTypeNode) && importTypeNode.qualifier && (!type || type.symbol)) {
            // Symbol for the left-most thing after the dot
            const firstIdentifier = getFirstIdentifier(importTypeNode.qualifier);
            const name = getNameForExportedSymbol(firstIdentifier.symbol, scriptTarget);
            const qualifier = name !== firstIdentifier.text
                ? replaceFirstIdentifierOfEntityName(importTypeNode.qualifier, factory.createIdentifier(name))
                : importTypeNode.qualifier;

            const symbols = [firstIdentifier.symbol];
            const typeArguments: TypeNode[] = [];
            if (importTypeNode.typeArguments) {
                importTypeNode.typeArguments.forEach(arg => {
                    const ref = tryGetAutoImportableReferenceFromImportTypeNode(arg, /*undefined*/ type, scriptTarget);
                    if (ref) {
                        symbols.push(...ref.symbols);
                        typeArguments.push(ref.typeReference);
                    }
                    else {
                        typeArguments.push(arg);
                    }
                });
            }

            return {
                symbols,
                typeReference: factory.createTypeReferenceNode(qualifier, typeArguments)
            };
        }
    }

    function replaceFirstIdentifierOfEntityName(name: EntityName, newIdentifier: Identifier): EntityName {
        if (name.kind === SyntaxKind.Identifier) {
            return newIdentifier;
        }
        return factory.createQualifiedName(replaceFirstIdentifierOfEntityName(name.left, newIdentifier), name.right);
    }

    export function importSymbols(importAdder: ImportAdder, symbols: readonly Symbol[]) {
        symbols.forEach(s => importAdder.addImportFromExportedSymbol(s, /*usageIsTypeOnly*/ true));
    }
}
