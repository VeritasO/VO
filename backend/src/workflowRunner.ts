import fs from "fs/promises";
import path from "path";

export async function runWorkflowByFile(workflowFilePath: string, input: any) {
  const workflowsDir = path.dirname(workflowFilePath);
  const workflowRaw = await fs.readFile(workflowFilePath, "utf8");
  const workflow = JSON.parse(workflowRaw);

  const timestamp = Date.now();
  const baseName = path.basename(workflowFilePath).replace(/\.[^.]+$/, "");

  // Simulate step execution: create one artifact per step if steps exist, otherwise one combined artifact
  const artifacts: string[] = [];
  if (Array.isArray(workflow.steps) && workflow.steps.length > 0) {
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      const artifactName = `${baseName}.step${i + 1}.${timestamp}.artifact.json`;
      const artifactPath = path.join(workflowsDir, artifactName);
      const artifact = {
        workflowId: workflow.id || baseName,
        stepIndex: i + 1,
        step: step,
        agent: step.agent || null,
        input,
        result: {
          status: "ok",
          note: "simulated execution",
        },
        createdAt: new Date().toISOString(),
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      artifacts.push(artifactPath);
    }
  } else {
    const artifactName = `${baseName}.execution.${timestamp}.artifact.json`;
    const artifactPath = path.join(workflowsDir, artifactName);
    const artifact = {
      workflowId: workflow.id || baseName,
      input,
      workflow,
      result: {
        status: "ok",
        note: "simulated execution (no explicit steps)"
      },
      createdAt: new Date().toISOString()
    };
    await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
    artifacts.push(artifactPath);
  }

  return { artifacts };
}
