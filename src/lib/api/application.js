import { serverFetch } from "../core/server"


export const getApplicationByApplicant=async(applicationId)=>{
    return  serverFetch(`/api/application?applicantId=${applicationId}`);
}