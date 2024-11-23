import { Card } from '@/components/ui/card'
import { Youtube } from '@/components/Youtube'
import { Bird, BookX } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center flex mb-2 justify-center items-end ">
          <BookX className='w-12 h-12 text-primary dark:text-white -mr-1' />
        </h1>
        <h1 className="text-4xl font-bold text-center dark:text-white text-primary mb-8">How It Works</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-center text-muted-foreground">
            Explore everything behind this project — repositories, videos, presentations, and pitches — all in one place.
          </p>
        </div>
        </div>
        
        <div className='px-40'>

          {/* Title and Caption */}
        <h1 className='text-4xl pb-2 font-semibold'><Bird/>MoneyTalk</h1>
        <p className='text-muted-foreground pb-6'>
        AI powered Finance App that works for you. Experience a dynamic dashboard that not only visualizes your financial data but also leverages AI to deliver actionable insights, trend analysis, and personalized recommendations.
        </p>

        {/* Key Features */}
        <h3 className='text-xl font-semibold' >Key Features</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Personal Finance Dashboard, All in One</li>
              <li>• Answer & Suggest personal financial questions (With TTS Support)</li>
              <li>• Smart Credit Score Improvement and Suggestions</li>
              <li>• Assists to set new financial goals</li>
              <li>• Intelligent Investment Growth</li>
              <li>• Fraud Prevention Education</li>
              <li>• Smart Funds Transfer</li>
            </ul>
        </ul>

        {/* Dataset */}
        <h3 className='text-xl font-semibold' >Dataset</h3>
        <p className='text-muted-foreground pb-2'>The datasets used are the open finance mocked data for proof of concept, which includes:</p>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• User</li>
              <li>• Transactions</li>
              <li>• Loans</li>
              <li>• Credit Cards</li>
              <li>• Fixed Deposits</li>
              <li>• Goals</li>
            </ul>
        </ul>
        {/* System Architecture */}
        <h2 className='text-2xl pb-4 pt-2 font-semibold'>System Architecture</h2>
        <img
          src="https://cbpnqfdsqypkzetfjamc.supabase.co/storage/v1/object/public/images/system%20architecture.jpg"
          alt='system-architecture'
          className='w-full p-10'
          />

        {/* AWS Services */}
        <h3 className='text-xl font-semibold' >AWS Services</h3>
        <ul className='text-muted-foreground'>
          <li>
          1) Amazon Bedrock Agent with AWS Lambda
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The solution leverages Amazon Bedrock, an AI service, integrated with AWS Lambda to power the conversational agent. Lambda functions enable serverless execution of code in response to various events, which minimizes infrastructure management while scaling automatically based on demand. This combination allows for efficient deployment and management of conversational agents for real-time, event-driven tasks.</li>
            </ul>
          </li>
          <li>
          2) Amazon S3 for Knowledge Base & Amazon OpenSearch Service (AOSS) for Indexing and Retrieval-Augmented Generation (RAG)
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The project uses Amazon S3 as a scalable storage solution for the knowledge base, ensuring high availability and durability for large datasets. In tandem, Amazon OpenSearch Service (AOSS) facilitates indexing and searching through this knowledge base. The RAG (Retrieval-Augmented Generation) approach improves the conversational agent’s ability to deliver accurate and contextually relevant responses by retrieving the most pertinent information from indexed data.</li>
            </ul>
          </li>
          <li>
          3) Amazon EC2 for Hosting API and LLM
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • Amazon EC2 instances are utilized to host the Python API responsible for managing calls to the Large Language Model (LLM). This setup provides full control over the compute environment, allowing customization, scalability, and optimization based on the processing requirements of the LLM. By running the API on EC2, the solution can handle high levels of traffic while maintaining performance and reliability.</li>
            </ul>
          </li>
          <li>
          4) Amazon Route 53 and Elastic Load Balancer for HTTPS Traffic Management
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • To ensure secure, highly available, and scalable web traffic management, the project employs Amazon Route 53 for DNS routing and Elastic Load Balancer (ELB) for distributing incoming HTTPS traffic across EC2 instances. This setup helps in maintaining a robust, secure infrastructure by evenly distributing traffic and enhancing fault tolerance while providing HTTPS encryption for secure communication between users and the server.
              </li>
            </ul>
          </li>
        </ul>

        {/* LLM */}
        <h3 className='text-xl font-semibold' >Claude 3 Haiku</h3>
        <p className='text-muted-foreground pb-2'>In selecting the AI model for our chatbot, we carefully evaluated several available options and ultimately chose Claude 3 Haiku due to its unique combination of features that align perfectly with our project’s needs.</p>
        <ul className='text-muted-foreground'>
          <li>
          1) Low Token Cost
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • One of the primary reasons we selected Claude 3 Haiku is its efficiency in terms of token usage. Claude 3 Haiku operates with lower token consumption compared to many other large language models, which helps reduce operational costs, especially in high-traffic environments. This efficiency makes it ideal for sustained, large-scale chatbot applications where minimizing token usage is crucial to maintaining cost-effectiveness.</li>
            </ul>
          </li>
          <li>
          2) Natural and Contextual Conversations
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • Claude 3 Haiku excels at generating natural, context-aware responses. This makes it particularly well-suited for chatbots, where providing fluid and relevant replies is essential for a high-quality user experience. Its ability to maintain the context of the conversation across multiple exchanges enhances the chatbot’s utility in a dynamic environment.</li>
            </ul>
          </li>
          <li>
          3) Scalability and Integration
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The model is highly scalable and integrates seamlessly with the existing AWS infrastructure we are using, including Bedrock and RAG for improved response quality. This makes Claude 3 Haiku a strategic choice that supports the broader system architecture efficiently, without requiring extensive custom integrations.
              </li>
            </ul>
          </li>
          <li>
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> By selecting Claude 3 Haiku, we ensure that our chatbot is both cost-efficient and capable of delivering high-quality, contextually accurate responses while maintaining flexibility and scalability for future growth.
              </li>
            </ul>
          </li>
        </ul>

        {/* Use Cases and Prompts */}
        <h3 className='text-xl font-semibold' >Use Cases and Examples Prompts</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>•  When can i retire?</li>
              <li>• Am I financially ready for a partner?</li>
              <li>• Can i afford a Tesla Model 3</li>
              <li>• Is there any anomaly transactions?</li>
              <li>• Is XX a scam messages</li>
              <li>• Help me create a financial goal</li>
              <li>• Help me transfer funds</li>
            </ul>
        </ul>

        {/* Future Direction */}
        <h3 className='text-xl font-semibold' >Future Directions </h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Enhance MoneyTalk's performance by integrating more financial knowledge.</li>
              <li>• Add more features to the bot and automation.</li>
            </ul>
        </ul>

        {/* Conclusion */}
        <h3 className='text-xl font-semibold' >Conclusion </h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>We would like to extend our heartfelt thanks to PayNet and JomHac k for organizing this hackathon. It has been an incredible experience, and we are truly grateful for the opportunity to participate in such an exciting and innovative competition.</li>
              <br/>
              <li>This was our team’s first time working extensively with projects utilizing open finance data, and we were thoroughly impressed by the vast potential it offers to create innovative solutions that empower users. The experience not only expanded our understanding of open finance frameworks but also challenged us to think critically about data security, user privacy, and seamless integration. We gained valuable insights into how open finance can be leveraged to enhance financial transparency and inclusion, and we are excited about the possibilities for future applications of this transformative technology.</li>
              <br/>
              <li>Once again, thank you to everyone involved in making this hackathon a success, and we look forward to utilizing the skills and knowledge we’ve gained to push the boundaries of what’s possible in open finance.</li>
            </ul>
        </ul>
      </div>
        <section id='youtube' className='w-full px-5 md:px-28 pb-10'>
          {/* <Youtube/> */}
        </section>
        
    </div>

  )
}
