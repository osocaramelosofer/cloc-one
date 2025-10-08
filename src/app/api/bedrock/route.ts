import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from '@aws-sdk/client-bedrock-agent-runtime';

export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        
        if (!session || !session.idToken) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        const { query, sessionId } = await request.json();

        if (!query || !sessionId) {
            return NextResponse.json(
                { error: "Faltan parámetros requeridos" },
                { status: 400 }
            );
        }

        // Configurar cliente de Bedrock con credenciales de variables de entorno
        const client = new BedrockAgentRuntimeClient({
            region: process.env.AWS_REGION || "us-east-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        });

        const input = {
            agentId: process.env.BEDROCK_AGENT_ID!,
            agentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID!,
            sessionId: sessionId,
            inputText: query,
        };

        const command = new InvokeAgentCommand(input);
        const response = await client.send(command);

        let completion = '';
        const decoder = new TextDecoder('utf-8');
        
        if (response.completion) {
            for await (const chunk of response.completion) {
                const text = decoder.decode(chunk?.chunk?.bytes);
                completion += text;
            }
        }

        return NextResponse.json({ 
            success: true, 
            completion 
        });

    } catch (error) {
        console.error('Error en Bedrock API:', error);
        return NextResponse.json(
            { 
                error: "Error al invocar el agente de Bedrock",
                details: error instanceof Error ? error.message : "Error desconocido"
            },
            { status: 500 }
        );
    }
}

