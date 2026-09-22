import { protectedFetch } from "../core/server";



export const getApplicationByApplicant=async(applicationId)=>{
    return protectedFetch(`/api/application?applicantId=${applicationId}`);
}