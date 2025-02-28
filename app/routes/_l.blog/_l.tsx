import { AnimatedOutlet } from "#/components/animated-outlet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_l/blog/_l")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="prose container mx-auto md:max-w-3xl">
      <AnimatedOutlet />
    </div>
  );
}
