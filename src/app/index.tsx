import { ExampleScreen } from "@/features/example";

// The route imports the screen through the feature's public API (R3) and
// renders it. Nothing else belongs here.
export default function Index() {
  return <ExampleScreen />;
}
