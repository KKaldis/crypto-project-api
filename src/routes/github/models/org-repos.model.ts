import Repository, { Permissions } from "./common.models";

type OrgReposRes = Repository & { permisisons: Permissions }[];
export default OrgReposRes;
