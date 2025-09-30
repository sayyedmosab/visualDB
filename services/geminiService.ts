
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { type CustomNode, type CustomEdge } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDbModel(nodes: CustomNode[], edges: CustomEdge[]): Promise<string> {
  if (nodes.length === 0) {
    return Promise.resolve("/* No components in the model to generate a schema from. Add components to the canvas. */");
  }

  const modelDescription = `
    Business Model Components:
    ${nodes.map(node => `
      - Component: "${node.data.name}"
        - Expected Data Volume: ${node.data.dataAmount || 'Not specified'}
        - Data Access/Change Frequency: ${node.data.frequency || 'Not specified'}
        - Granularity Levels:
          - L1: ${node.data.l1.name || 'Not specified'}
          - L2: ${node.data.l2.name || 'Not specified'}
          - L3: ${node.data.l3.name || 'Not specified'}
    `).join('')}

    Relationships:
    ${edges.length > 0 ? edges.map(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return '';
      return `
      - A relationship exists between "${sourceNode.data.name}" (at Level ${edge.data?.level.toUpperCase()}) and "${targetNode.data.name}" (at Level ${edge.data?.level.toUpperCase()}).
        The specific relationship type (e.g., one-to-one, one-to-many) is not defined, please infer the most logical relationship.
      `;
    }).join('') : 'No relationships defined between components.'}
  `;

  const prompt = `
    You are an expert database architect. Your task is to design an optimal SQL database model based on a visual business model description.
    Analyze the following components, their data properties, granularity levels, and relationships.
    Then, generate a complete set of SQL 'CREATE TABLE' statements.

    Your response must be valid SQL code only.

    - Include primary keys (preferably auto-incrementing integers named 'id').
    - Include foreign key constraints to represent the relationships.
    - Suggest appropriate data types for columns.
    - Add comments to explain your design choices where necessary, especially for indexes.
    - Based on the data volume and frequency, suggest necessary indexes to optimize performance.

    Here is the business model:
    ${modelDescription}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let sqlCode = response.text;
    
    // Clean up the response to ensure it's valid SQL
    sqlCode = sqlCode.replace(/```sql/g, '').replace(/```/g, '').trim();

    return sqlCode;
  } catch (error) {
    console.error("Error generating DB model:", error);
    return "/* An error occurred while generating the database model. Please check the console for details. */";
  }
}
