"use client";

import { useEffect, useState } from "react";

import useApi from "@/utils/useApi.ts";
import Template from "@/components/shared/Template";

const TemplateDesign = ({ type }) => {
    const [templates, setTemplates] = useState([]);

    const { data, error } = useApi('api/v1/design/templates');

    useEffect(() => {
        if(data) {
            setTemplates(data?.data?.templates);
        }
    }, [data]);

    return (
        <>
            <div className={`grid gap-2 ${type ? ' grid-cols-2 ' : ' grid-cols-4 mt-5'}`}>
                {
                    templates.map((template: any, index: number) =>
                        (
                          <Template key={index} index={index} template={template} type={type} />
                        )
                    )
                }
            </div>
        </>
    )
}

export default TemplateDesign;