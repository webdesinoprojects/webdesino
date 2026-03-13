"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createProject, updateProject } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    slug: string;
    industry: string;
    description: string;
    image: string;
    fullDescription: string | null;
    results: string | null;
    metrics: any;
    faqs?: any;
  };
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    industry: project?.industry || "",
    description: project?.description || "",
    image: project?.image || "",
    fullDescription: project?.fullDescription || "",
    results: project?.results || "",
    metrics: Array.isArray(project?.metrics) ? project?.metrics : [
      { label: "Revenue", value: "" },
      { label: "ROI", value: "" },
      { label: "Timeline", value: "" },
      { label: "Channels", value: "" }
    ],
    faqs: project?.faqs || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, fullDescription: value }));
  };

  const handleResultsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, results: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...(prev.metrics || []), { label: "", value: "" }]
    }));
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...(formData.metrics || [])];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setFormData(prev => ({ ...prev, metrics: newMetrics }));
  };

  const removeMetric = (index: number) => {
    const newMetrics = [...(formData.metrics || [])];
    newMetrics.splice(index, 1);
    setFormData(prev => ({ ...prev, metrics: newMetrics }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }]
    }));
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };

  const removeFaq = (index: number) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs.splice(index, 1);
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/admin/case-studies");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/case-studies">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {project ? "Edit Case Study" : "New Case Study"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-premium-form space-y-8">
        <Card className="admin-form-card">
          <CardHeader>
            <CardTitle>Case Study Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description (HTML)</Label>
              <RichTextEditor
                value={formData.fullDescription}
                onChange={handleFullDescriptionChange}
                placeholder="Detailed case study description..."
              />
            </div>

            <div className="space-y-2">
              <Label>Case Study Image</Label>
              <ImageUpload
                name="image"
                defaultValue={formData.image}
                onUploadComplete={handleImageUpload}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="admin-form-card">
          <CardHeader>
            <CardTitle>Results & Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="results">Results Summary (HTML)</Label>
              <RichTextEditor
                value={formData.results}
                onChange={handleResultsChange}
                placeholder="Summary of results achieved..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Key Metrics</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMetric}>
                  <Plus className="h-4 w-4 mr-2" /> Add Metric
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {formData.metrics?.map((metric: any, index: number) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Label (e.g. Revenue)"
                        value={metric.label}
                        onChange={(e) => updateMetric(index, "label", e.target.value)}
                      />
                      <Input
                        placeholder="Value (e.g. ₹25L+)"
                        value={metric.value}
                        onChange={(e) => updateMetric(index, "value", e.target.value)}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 mt-1"
                      onClick={() => removeMetric(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="admin-form-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Case Study FAQs</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFaq}>
              <Plus className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.faqs?.map((faq: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 bg-slate-50 relative">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeFaq(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                    placeholder="e.g. What was the biggest challenge?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    placeholder="Answer..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : project ? "Update Case Study" : "Create Case Study"}
          </Button>
        </div>
      </form>
    </div>
  );
}
