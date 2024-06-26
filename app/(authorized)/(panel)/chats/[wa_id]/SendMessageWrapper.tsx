'use client';

import { useState } from "react";
import SendMessageUI, { FileType } from "./SendMessageUI";

export default function SendMessageWrapper({ waId }: { waId: string }) {
    const [message, setMessage] = useState<string>('');
    const [fileType, setFileType] = useState<FileType | undefined>();
    const [file, setFile] = useState<File | undefined>();
    const onMessageSend = async () => {
        const formData = new FormData();
        formData.set('to', waId);
        formData.set('message', message.trim());
        if (typeof file !== 'undefined' && typeof fileType !== 'undefined') {
            formData.set('fileType', fileType)
            formData.set('file', file)
        }
        const response = await fetch('/api/sendMessage', {
            method: 'POST',
            body: formData,
        })
        if (response.status === 200) {
            setMessage('')
            setFileType(undefined)
            setFile(undefined)
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    }

    return (
        <SendMessageUI message={message} file={file} fileType={fileType} setMessage={setMessage} setFileType={setFileType} setFile={setFile} onMessageSend={onMessageSend} />
    )
}