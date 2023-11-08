'use client'
import dynamic from "next/dynamic"
import { useState } from "react";
import {OutputData} from '@editorjs/editorjs';

const HtmlEditor = dynamic(() => import("./components/html-editor"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState<OutputData>();
  return (
    <main className="">
      <HtmlEditor data={data} onChange={setData} holder="editorjs-container"/>
    </main>
  )
}