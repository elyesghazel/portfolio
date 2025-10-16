import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // correct import
import { useState } from "react";

export default function RequestQuotePage() {
  const [projectType, setProjectType] = useState("UI/UX Design");
  const [deadline, setDeadline] = useState("asap");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const services = [
    { id: "uiux", label: "UI/UX Design", value: "UI/UX Design" },
    { id: "webdev", label: "Web Dev", value: "Web Dev" },
    { id: "3d", label: "3D Print & CAD", value: "3D Print & CAD" },
    { id: "custom", label: "Custom Project", value: "Custom Project" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, email, description, projectType, deadline };

    try {
      const res = await fetch(
        "https://webhook.site/ce125931-a3ac-4500-be58-0bfa390ec6c4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Quote request submitted!");
        // optionally reset form
        setName("");
        setEmail("");
        setDescription("");
        setProjectType("UI/UX Design");
        setDeadline("asap");
      } else {
        alert("Failed to submit quote request.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting quote request.");
    }
  };

  return (
    <div className="hero flex flex-col items-center pt-10 p-3 gap-20">
      {/* Title */}
      <div className="title text-center mb-12">
        <h1 className="text-3xl md:text-[64px] font-semibold">
          Let's put <span className="text-gradient">numbers</span> to your idea
        </h1>
        <span className="subtitle text-[16px] md:text-[20px] w-full text-(--text-subtitle)">
          Fill out this short form to receive a quick quote for your project.
        </span>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-3xl py-6 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
            <CardDescription>
              Provide some details and we will get back to you with an estimate.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Basic Information */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">What's your name?</Label>
              <div>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">What's your email?</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Short description of your project</Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe what you'd like to create or solve"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <RadioGroup
                  value={projectType}
                  onValueChange={setProjectType}
                  className="flex flex-col md:flex-row gap-4 mt-2"
                >
                  {services.map(({ id, label, value }) => (
                    <div key={id} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={value}
                        id={id}
                        className="w-5 h-5 border border-gray-400 rounded-full checked:bg-blue-600 focus:outline-none"
                      />
                      <Label htmlFor={id}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Budget & Time */}
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="deadline">When do you need it done?</Label>
                <RadioGroup
                  value={deadline}
                  onValueChange={setDeadline}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  {[
                    { id: "asap", label: "ASAP", value: "asap" },
                    { id: "1-2weeks", label: "1-2 weeks", value: "1-2weeks" },
                    { id: "1month", label: "1 month", value: "1month" },
                    { id: "flexible", label: "Flexible", value: "flexible" },
                  ].map(({ id, label, value }) => (
                    <div key={id} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={value}
                        id={id}
                        className="w-5 h-5 border border-gray-400 rounded-full checked:bg-blue-600 focus:outline-none"
                      />
                      <Label htmlFor={id}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-4 w-fit">
              Request Quote
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
