import { Auth } from "@/pages/auth";

import { Button } from "@/components/ui/button";
import { organization, signOut, useSession } from "@/lib/auth-client";
import { use, useEffect } from "react";

function App() {
  const { data: session, refetch } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);

  const setActive = async (targetId: string | null) => {
    if (session?.user) {
      const res = await organization.setActive({
        organizationId: targetId,
      });
      refetch(); // Refetch session to update active organization
      console.log("Set active organization response:", res);
    } else {
      console.log("No session data available");
    }
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/v1/meteorite-landing", {
      method: "GET",
      credentials: "include",
    }).then(async (r) => console.log(await r.json()));
    console.log("Data fetched from API:", res);
  };

  return (
    <div>
      <h1 className="text-center text-2xl mt-6">Better Auth Client Example</h1>
      {session ? (
        <div className="text-center mt-4">
          <p>Welcome!</p>
          <Button className="mt-4" onClick={() => signOut()}>
            Sign Out
          </Button>

          <Button className="mt-4" onClick={() => fetchData()}>
            fetch Data
          </Button>

          <Button
            className="mt-4"
            onClick={() => setActive("4c5DLEKUOSDsTzIuVXkoA1knMonFRxXN")}>
            Set Active Organization
          </Button>
          <Button className="mt-4" onClick={() => setActive(null)}>
            Set Active Organization null
          </Button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
