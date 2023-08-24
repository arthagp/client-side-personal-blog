'use client'
import React, { useEffect, useState } from "react";
import EditBlog from "@/components/Blog/EditBlog";
import {findBlogById} from '@/app/api/fetch'

const EditBlogPage = ({ params }) => {

  return (
    <>
      <EditBlog 
      postId={params.slug}
      initLink={`/dashboard/${params.slug}`}
      />
    </>
  );
};

export default EditBlogPage;
