"use client";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-100 animate-pulse rounded-md border border-slate-200 flex items-center justify-center text-slate-400">Loading Editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
          ],
        }}
      />
    </div>
  );
}
