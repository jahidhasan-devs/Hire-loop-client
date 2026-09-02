import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import React from 'react';
import PostJobForm from './PostJobForm';


const postJobpage =async () => {

const company= await getLoggedInRecruiterCompany();

    return (
        <div>
          <PostJobForm companyData={company}></PostJobForm>
        </div>
    );
};

export default postJobpage;