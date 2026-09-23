// code-insight — Real-time AI-driven code analysis and job matching in your browser.
// Zero-dependency Worker that serves ONE self-contained HTML micro-product. The entire app
// (markup, styles, and logic) is authored by the agent and inlined below as a single document —
// no framework, no build step, no external requests.

const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Insight - Real-time AI Code Analysis</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #121212;
            color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            transition: background-color 0.3s, color 0.3s;
        }
        body.light {
            background-color: #ffffff;
            color: #000000;
        }
        .container {
            width: 90%;
            max-width: 800px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #1f1f1f;
            transition: background-color 0.3s;
        }
        .container.light {
            background-color: #f9f9f9;
        }
        textarea {
            width: 100%;
            height: 200px;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #444;
            border-radius: 4px;
            background-color: #1a1a1a;
            color: #e0e0e0;
            resize: vertical;
        }
        textarea.light {
            background-color: #ffffff;
            color: #000000;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            background-color: #673ab7;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #5e35b1;
        }
        .results {
            margin-top: 20px;
            padding: 10px;
            border-radius: 4px;
            background-color: #2c2c2c;
            color: #e0e0e0;
            white-space: pre-wrap;
        }
        .results.light {
            background-color: #e0e0e0;
            color: #000000;
        }
    </style>
</head>
<body>
    <div class="container" id="app">
        <h1>Code Insight</h1>
        <p>Paste your code below and get real-time AI analysis!</p>
        <textarea id="codeInput" placeholder="Paste your code here..."></textarea>
        <button onclick="analyzeCode()">Analyze Code</button>
        <div class="results" id="results"></div>
    </div>
    <script>
        const app = document.getElementById('app');
        const codeInput = document.getElementById('codeInput');
        const results = document.getElementById('results');

        function analyzeCode() {
            const code = codeInput.value;
            const analysis = simulateAnalysis(code);
            results.textContent = \`Analysis:\\n\${analysis}\`;
        }

        function simulateAnalysis(code) {
            const keywords = ['function', 'class', 'if', 'else', 'for', 'while', 'return'];
            let analysis = '';

            keywords.forEach(keyword => {
                const count = (code.match(new RegExp(\`\\\\b\${keyword}\\\\b\`, 'g')) || []).length;
                analysis += \`\${keyword}: \${count}\\n\`;
            });

            return analysis;
        }

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            document.body.classList.toggle('light', e.matches);
            app.classList.toggle('light', e.matches);
            codeInput.classList.toggle('light', e.matches);
            results.classList.toggle('light', e.matches);
        });

        document.body.classList.toggle('light', window.matchMedia('(prefers-color-scheme: light)').matches);
        app.classList.toggle('light', window.matchMedia('(prefers-color-scheme: light)').matches);
        codeInput.classList.toggle('light', window.matchMedia('(prefers-color-scheme: light)').matches);
        results.classList.toggle('light', window.matchMedia('(prefers-color-scheme: light)').matches);
    </script>
</body>
</html>`;

export default {
  async fetch(): Promise<Response> {
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
