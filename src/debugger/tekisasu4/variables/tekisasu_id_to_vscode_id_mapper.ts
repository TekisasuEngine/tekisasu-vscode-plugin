export class TekisasuIdWithPath {
  constructor(public tekisasu_id: bigint, public path: string[] = []) {
  }

  toString(): string {
    return `${this.tekisasu_id.toString()}:${this.path.join("/")}`;
  }
}

type TekisasuIdWithPathString = string;

export class TekisasuIdToVscodeIdMapper {
  // Maps `tekisasu_id` to `vscode_id` and back.
  // Each `vscode_id` corresponds to expandable variable in vscode UI.
  // Each `tekisasu_id` corresponds to object in tekisasu server.
  // `vscode_id` maps 1:1 with [`tekisasu_id`, path_to_variable_inside_tekisasu_object].
  // For example, if tekisasu_object with id 12345 looks like: { SomeDict: { SomeField: [1,2,3] } },
  //   then `vscode_id` for the 'SomeField' will map to [12345, ["SomeDict", "SomeField"]] in order to allow expansion of SomeField in the vscode UI.
  // Note: `vscode_id` is a number and `tekisasu_id` is a bigint.
  
  private tekisasu_to_vscode: Map<TekisasuIdWithPathString, number>; // use TekisasuIdWithPathString, since JS Map treats TekisasuIdWithPath only by reference
  private vscode_to_tekisasu: Map<number, TekisasuIdWithPath>;
  private next_vscode_id: number;

  constructor() {
    this.tekisasu_to_vscode = new Map<TekisasuIdWithPathString, number>();
    this.vscode_to_tekisasu = new Map<number, TekisasuIdWithPath>();
    this.next_vscode_id = 1;
  }

  // Creates `vscode_id` for a given `tekisasu_id` and path
  create_vscode_id(tekisasu_id_with_path: TekisasuIdWithPath): number {
    const tekisasu_id_with_path_str = tekisasu_id_with_path.toString();
    if (this.tekisasu_to_vscode.has(tekisasu_id_with_path_str)) {
      throw new Error(`Duplicate tekisasu_id: ${tekisasu_id_with_path_str}`);
    }

    const vscode_id = this.next_vscode_id++;
    this.tekisasu_to_vscode.set(tekisasu_id_with_path_str, vscode_id);
    this.vscode_to_tekisasu.set(vscode_id, tekisasu_id_with_path);
    return vscode_id;
  }

  get_tekisasu_id_with_path(vscode_id: number): TekisasuIdWithPath {
    const tekisasu_id_with_path = this.vscode_to_tekisasu.get(vscode_id);
    if (tekisasu_id_with_path === undefined) {
      throw new Error(`Unknown vscode_id: ${vscode_id}`);
    }
    return tekisasu_id_with_path;
  }

  get_vscode_id(tekisasu_id_with_path: TekisasuIdWithPath, fail_if_not_found = true): number | undefined {
    const vscode_id = this.tekisasu_to_vscode.get(tekisasu_id_with_path.toString());
    if (fail_if_not_found && vscode_id === undefined) {
      throw new Error(`Unknown tekisasu_id_with_path: ${tekisasu_id_with_path}`);
    }
    return vscode_id;
  }

  get_or_create_vscode_id(tekisasu_id_with_path: TekisasuIdWithPath): number {
    let vscode_id = this.get_vscode_id(tekisasu_id_with_path, false);
    if (vscode_id === undefined) {
      vscode_id = this.create_vscode_id(tekisasu_id_with_path);
    }
    return vscode_id;
  }
}