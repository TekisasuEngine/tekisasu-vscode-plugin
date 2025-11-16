import { expect } from "chai";
import { TekisasuIdWithPath, TekisasuIdToVscodeIdMapper } from "./tekisasu_id_to_vscode_id_mapper";

suite("TekisasuIdToVscodeIdMapper", () => {
	test("create_vscode_id assigns unique ID", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(1), ["path1"]);
		const vscodeId = mapper.create_vscode_id(tekisasuId);
		expect(vscodeId).to.equal(1);
	});

	test("create_vscode_id throws error on duplicate", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(1), ["path1"]);
		mapper.create_vscode_id(tekisasuId);
		expect(() => mapper.create_vscode_id(tekisasuId)).to.throw("Duplicate tekisasu_id: 1:path1");
	});

	test("get_tekisasu_id_with_path returns correct object", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(2), ["path2"]);
		const vscodeId = mapper.create_vscode_id(tekisasuId);
		expect(mapper.get_tekisasu_id_with_path(vscodeId)).to.deep.equal(tekisasuId);
	});

	test("get_tekisasu_id_with_path throws error if not found", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		expect(() => mapper.get_tekisasu_id_with_path(999)).to.throw("Unknown vscode_id: 999");
	});

	test("get_vscode_id retrieves correct ID", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(3), ["path3"]);
		const vscodeId = mapper.create_vscode_id(tekisasuId);
		expect(mapper.get_vscode_id(tekisasuId)).to.equal(vscodeId);
	});

	test("get_vscode_id throws error if not found", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(4), ["path4"]);
		expect(() => mapper.get_vscode_id(tekisasuId)).to.throw("Unknown tekisasu_id_with_path: 4:path4");
	});

	test("get_or_create_vscode_id creates new ID if not found", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(5), ["path5"]);
		const vscodeId = mapper.get_or_create_vscode_id(tekisasuId);
		expect(vscodeId).to.equal(1);
	});

	test("get_or_create_vscode_id retrieves existing ID if already created", () => {
		const mapper = new TekisasuIdToVscodeIdMapper();
		const tekisasuId = new TekisasuIdWithPath(BigInt(6), ["path6"]);
		const vscodeId1 = mapper.get_or_create_vscode_id(tekisasuId);
		const vscodeId2 = mapper.get_or_create_vscode_id(tekisasuId);
		expect(vscodeId1).to.equal(vscodeId2);
	});
});
