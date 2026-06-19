export async function POST(request: Request) {
    const headers = { "Content-type": "application/json" };
  
    try {
      const { prompt } = await request.json();
      if (!prompt?.trim()) {
        return new Response(JSON.stringify({ error: "Missing prompt" }), {
          status: 400,
          headers,
        });
      }

      const url = process.env.IMAGE_API_URL;
      const token = process.env.IMAGE_API_TOKEN;
        if (!url || !token) {
        return new Response(
            JSON.stringify({
            error:
                "Server misconfigured: missing IMAGE_API_URL or IMAGE_API_TOKEN",
            }),
            { status: 500, headers }
        );
        }

        const enhancedPrompt = `${prompt}.Make the image 16:9 aspect ratio and visually well-framed. `

        const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: enhancedPrompt }),
          });

          const arrayBuffer = await res.arrayBuffer();
          const imageUrl = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString("base64")}`

          return new Response(JSON.stringify({imageUrl}), {status:200 , headers})


    
    } catch (e) {}
  }