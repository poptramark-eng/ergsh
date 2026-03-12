'use client';
import * as xlsx from "xlsx";
import React, {useEffect, useState} from "react";
export default function Doc(){

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const file = form.get("file") as File;

        const bytes =await file.arrayBuffer();
        const buffer = new Uint8Array(bytes);

        const workbook = xlsx.read(buffer, {type: "array"});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        alert(data+`${JSON.stringify(data)}`);
    }


return (<div>
    <form onSubmit={handleSubmit}>
        <div>
    
    <input type="file" name="file" id="file" accept=".xlsx, .xls" />
        </div>
        <div>

<input type="submit" value="upload" />
        </div>
    </form>
</div>);
}