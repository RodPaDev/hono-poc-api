import { Auth } from "@/pages/auth";
import { Button } from "./components/ui/button";
import { signOut, useSession } from "./lib/auth-client";

function App() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-center text-2xl mt-6">Better Auth Client Example</h1>
      {session ? (
        <div className="text-center mt-4">
          <p>Welcome!</p>
          <Button className="mt-4" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
