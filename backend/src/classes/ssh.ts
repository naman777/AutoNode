import { NodeSSH, SSHExecCommandResponse } from "node-ssh";
import fs from "fs";

export class SSHConnection {
  private ssh: NodeSSH | null = null;
  private host: string;
  private username: string;
  private privateKeyPath: string;

  constructor(host: string, username: string, privateKeyPath: string) {
    this.host = host;
    this.username = username;
    this.privateKeyPath = privateKeyPath;
  }

  async connect(): Promise<NodeSSH | null | undefined> {
    if (!this.ssh) {
      try {
        this.ssh = new NodeSSH();
        const privateKeyBuffer = fs.readFileSync(this.privateKeyPath);
        const privateKey = privateKeyBuffer.toString('utf8');
        await this.ssh.connect({
          host: this.host,
          username: this.username,
          privateKey: privateKey,
        });
        const result = await this.runCommand('ls -la');
        console.log(result);
        console.log("Successfully Connected to EC2 Instance");
      } catch (error) {
        console.error("Error connecting to EC2 Instance", error);
        throw error;
      }
    } else {
      console.log("Already connected to EC2 Instance");
    }
    return this.ssh;
  }

  async runCommand(
    command: string
  ): Promise<SSHExecCommandResponse | undefined | unknown> {
    if (!this.ssh) {
      console.error("SSH connection is not established. Call connect() first.");
      console.log("Connecting to EC2 instance...");
      await this.connect();
      this.runCommand(command);
      return;
    }

    try {
      const result = await this.ssh.execCommand(command);
      console.log("STDOUT:", result.stdout);
      console.error("STDERR:", result.stderr);
      return result;
    } catch (error) {
      console.error("Error executing command:", error);
      return error;
    }
  }

  async disconnect() {
    if (this.ssh) {
      this.ssh.dispose();
      this.ssh = null;
      console.log("Disconnected from EC2 instance.");
    }
  }
}
