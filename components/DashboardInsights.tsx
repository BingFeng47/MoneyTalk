import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IconBulb } from '@tabler/icons-react';

export default function DashboardInsights() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<{ user: string; chat: string }[]>([]);
  const [sessionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    const initialPrompt = "Use available data to analyze my financial health and provide insights and suggestions in Markdown format. Return only the insights and suggestions in point form and go to next line for another point.";
    fetchBotResponse({ user: 'user', chat: initialPrompt });
  }, [refresh]);

  const fetchBotResponse = async (chats: { user: string; chat: string }) => {
    if (!chats) return;

    try {
      setLoading(true);

      const requestBody = {
        user: chats.user,
        chat: chats.chat,
      };

      const apiResponse = await fetch(`https://api1.ocealab.co/bot?sessionId=${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!apiResponse.ok) {
        console.error('Error fetching response from API');
        setLoading(false);
        return;
      }

      const reader = apiResponse.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('Failed to get reader from response body.');

      let botResponse = '';
      const processStream = async () => {
        let done = false;

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;

          if (value) {
            botResponse += decoder.decode(value, { stream: true });
          }
        }

        setResponses([{ user: 'bot', chat: botResponse }]);
        setLoading(false);
      };

      await processStream();
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setLoading(false);
    }
  };

  return (
    <div id='DashboardInsights' className="dashboard-insights">
      <Card>
        <CardHeader className="flex justify-between flex-row items-center pb-0 mb-0">
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="text-yellow-200" /> Personalized Insights
          </CardTitle>
          {!loading && (
          <Button
            onClick={() => {
              setRefresh(!refresh);
              setLoading(true);
              setResponses([]);
            }}
            className='mb-0'
          >
            <RefreshCcw />
          </Button>
          )}
        </CardHeader>
        <CardContent className='pt-5 mt-0'>
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin mr-2 text-primary" />
              <p className="text-primary">Loading insights...</p>
            </div>
          ) : responses.length > 0 ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {responses[responses.length - 1].chat}
            </ReactMarkdown>
          ) : (
            <p>No insights available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}