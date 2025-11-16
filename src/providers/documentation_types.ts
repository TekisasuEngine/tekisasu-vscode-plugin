import type { DocumentSymbol, Range, SymbolKind } from "vscode-languageclient";

export interface NativeSymbolInspectParams {
	native_class: string;
	symbol_name: string;
}

export class TekisasuNativeSymbol implements DocumentSymbol {
	name: string;
	detail?: string;
	kind: SymbolKind;
	tags?: 1[];
	deprecated?: boolean;
	range: Range;
	selectionRange: Range;
	children?: DocumentSymbol[];
	documentation: string;
	native_class: string;
	class_info?: TekisasuNativeClassInfo;
}

export interface TekisasuNativeClassInfo {
	name: string;
	inherits: string;
	extended_classes?: string[];
}

export interface TekisasuCapabilities {
	native_classes: TekisasuNativeClassInfo[];
}
