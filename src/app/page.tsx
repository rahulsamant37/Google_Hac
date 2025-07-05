import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Languages, FileText, BrainCircuit, Paintbrush, Star, TrendingUp, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap = {
  blue: {
    iconContainer: "bg-blue-100 dark:bg-blue-900/50",
    icon: "text-blue-500 dark:text-blue-400",
    button: "bg-blue-500 text-white hover:bg-blue-600 transition-colors",
  },
  purple: {
    iconContainer: "bg-purple-100 dark:bg-purple-900/50",
    icon: "text-purple-500 dark:text-purple-400",
    button: "bg-purple-500 text-white hover:bg-purple-600 transition-colors",
  },
  green: {
    iconContainer: "bg-green-100 dark:bg-green-900/50",
    icon: "text-green-500 dark:text-green-400",
    button: "bg-green-500 text-white hover:bg-green-600 transition-colors",
  },
  orange: {
    iconContainer: "bg-orange-100 dark:bg-orange-900/50",
    icon: "text-orange-500 dark:text-orange-400",
    button: "bg-orange-500 text-white hover:bg-orange-600 transition-colors",
  },
};

const features = [
  {
    title: "Content Localizer",
    description: "Translate and adapt educational materials for any regional language.",
    href: "/localize",
    icon: Languages,
    color: "blue",
  },
  {
    title: "Worksheet Generator",
    description: "Scan textbook pages to create differentiated worksheets for all learning levels.",
    href: "/worksheets",
    icon: FileText,
    color: "purple",
  },
  {
    title: "AI Assistant",
    description: "Get instant, age-appropriate answers to tough student questions.",
    href: "/assist",
    icon: BrainCircuit,
    color: "green",
  },
  {
    title: "Visual Aid Designer",
    description: "Generate simple, blackboard-friendly diagrams from your descriptions.",
    href: "/visual-aids",
    icon: Paintbrush,
    color: "orange",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in-50 duration-500">
      <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-white/10">
            <GraduationCap size={150} strokeWidth={1.5} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Welcome back, Teacher! 👋</h1>
          <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl">
            Empower your teaching with AI. Let's create amazing learning experiences together.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 rounded-full">
              <Star className="mr-2 h-4 w-4" />
              Explore Premium
            </Button>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 rounded-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const colors = colorMap[feature.color as keyof typeof colorMap];
          return (
            <Card key={feature.title} className="flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl border-border/60">
              <CardHeader className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div className={cn("p-3 rounded-xl", colors.iconContainer)}>
                    <feature.icon className={cn("w-7 h-7", colors.icon)} />
                  </div>
                </div>
                <div>
                  <CardTitle className="font-bold text-lg">{feature.title}</CardTitle>
                  <CardDescription className="pt-1 text-sm">{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter>
                <Button asChild className={cn("w-full rounded-lg", colors.button)}>
                  <Link href={feature.href}>
                    Start Creating <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
