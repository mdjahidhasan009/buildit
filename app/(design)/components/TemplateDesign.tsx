"use client";

import {FC, useEffect, useState} from "react";

import useApi from "@/utils/useApi";
import Template from "@/components/shared/Template";

interface TemplateDesignProps {
    type: "main" | ""; // 'type' can be "main" or an empty string
}

const TemplateDesign: FC<TemplateDesignProps> = ({ type }) => {
    const [templates, setTemplates] = useState([]);

    const { data, error } = useApi('api/v1/designs/templates');

    useEffect(() => {
        if(data) {
            setTemplates(data?.data?.templates);
        }
    }, [data]);

    return (
        <>
            <div className={`grid gap-2 m-4 mt-5 ${type ? ' grid-cols-2 ' : ' grid-cols-4'}`}>
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