import Repository, { Permissions } from "./common.model";

type OrgReposRes = Repository & { permisisons: Permissions }[];
export default OrgReposRes;
