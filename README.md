# ✨ MoneyTalk

WebApp: [MoneyTalk: No Money, Let's Talk!](https://bouz.ocealab.co)\

AI powered Finance App that works for you. Experience a dynamic dashboard that not only visualizes your financial data but also leverages AI to deliver actionable insights, trend analysis, and personalized recommendations​

---

## 🔑 Key Features

- Personal Finance Dashboard, All in One
- Answer & Suggest personal financial questions (With TTS Support)
- Assists to set new financial goals
- Intelligent Investment Growth
- Smart Credit Score Improvement and Suggestions
- Fraud Prevention Education
- Smart Funds Transfer

## 📒 Dataset

The datasets used are the open finance mocked data for proof of concept, which includes

- User
- Transactions
- Loans
- Credit Cards
- Fixed Deposits
- Goals

## ⚙️ System Architecture

<img width="1169" alt="workflow" src="https://cbpnqfdsqypkzetfjamc.supabase.co/storage/v1/object/public/images/system%20architecture.jpg">

### AWS Services

1. Amazon Bedrock Agent with AWS Lambda

- The solution leverages Amazon Bedrock, an AI service, integrated with AWS Lambda to power the conversational agent. Lambda functions enable serverless execution of code in response to various events, which minimizes infrastructure management while scaling automatically based on demand. This combination allows for efficient deployment and management of conversational agents for real-time, event-driven tasks.

2. Amazon S3 for Knowledge Base & Amazon OpenSearch Service (AOSS) for Indexing and Retrieval-Augmented Generation (RAG)

- The project uses Amazon S3 as a scalable storage solution for the knowledge base, ensuring high availability and durability for large datasets. In tandem, Amazon OpenSearch Service (AOSS) facilitates indexing and searching through this knowledge base. The RAG (Retrieval-Augmented Generation) approach improves the conversational agent’s ability to deliver accurate and contextually relevant responses by retrieving the most pertinent information from indexed data.

3. Amazon EC2 for Hosting API and LLM

- Amazon EC2 instances are utilized to host the Python API responsible for managing calls to the Large Language Model (LLM). This setup provides full control over the compute environment, allowing customization, scalability, and optimization based on the processing requirements of the LLM. By running the API on EC2, the solution can handle high levels of traffic while maintaining performance and reliability.

4. Amazon Route 53 and Elastic Load Balancer for HTTPS Traffic Management

- To ensure secure, highly available, and scalable web traffic management, the project employs Amazon Route 53 for DNS routing and Elastic Load Balancer (ELB) for distributing incoming HTTPS traffic across EC2 instances. This setup helps in maintaining a robust, secure infrastructure by evenly distributing traffic and enhancing fault tolerance while providing HTTPS encryption for secure communication between users and the server.

### Claude 3 Haiku

In selecting the AI model for our chatbot, we carefully evaluated several available options and ultimately chose Claude 3 Haiku due to its unique combination of features that align perfectly with our project’s needs.

1. Low Token Cost

- One of the primary reasons we selected Claude 3 Haiku is its efficiency in terms of token usage. Claude 3 Haiku operates with lower token consumption compared to many other large language models, which helps reduce operational costs, especially in high-traffic environments. This efficiency makes it ideal for sustained, large-scale chatbot applications where minimizing token usage is crucial to maintaining cost-effectiveness.

2. Natural and Contextual Conversations

- Claude 3 Haiku excels at generating natural, context-aware responses. This makes it particularly well-suited for chatbots, where providing fluid and relevant replies is essential for a high-quality user experience. Its ability to maintain the context of the conversation across multiple exchanges enhances the chatbot’s utility in a dynamic environment.

3. Scalability and Integration

- The model is highly scalable and integrates seamlessly with the existing AWS infrastructure we are using, including Bedrock and RAG for improved response quality. This makes Claude 3 Haiku a strategic choice that supports the broader system architecture efficiently, without requiring extensive custom integrations.

By selecting Claude 3 Haiku, we ensure that our chatbot is both cost-efficient and capable of delivering high-quality, contextually accurate responses while maintaining flexibility and scalability for future growth.

## 🙌🏼 Use Cases and Examples Prompts

1. When can i retire?
2. Am I financially ready for a partner?
3. Can i afford a Tesla Model 3
4. Am I financially at risk
5. Is there any anomaly transactions?
6. Is XXX a scam messages?
7. Help me create a financial goal
8. Help me transfer funds

## 💭 Future Directions

- Enhance MoneyTalk's performance by integrating more financial knowledge.
- Add more features to the bot and automation.

## 🎉 Conclusion

We would like to extend our heartfelt thanks to PayNet and JomHac k for organizing this hackathon. It has been an incredible experience, and we are truly grateful for the opportunity to participate in such an exciting and innovative competition.

This was our team’s first time working extensively with projects utilizing open finance data, and we were thoroughly impressed by the vast potential it offers to create innovative solutions that empower users. The experience not only expanded our understanding of open finance frameworks but also challenged us to think critically about data security, user privacy, and seamless integration. We gained valuable insights into how open finance can be leveraged to enhance financial transparency and inclusion, and we are excited about the possibilities for future applications of this transformative technology.

Once again, thank you to everyone involved in making this hackathon a success, and we look forward to utilizing the skills and knowledge we’ve gained to push the boundaries of what’s possible in open finance.
