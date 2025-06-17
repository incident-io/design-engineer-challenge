// Fake API client for Scribe note-taking functionality

const Status = {
  IDLE: 'idle',
  RECORDING: 'recording',
  ADMISSION_REQUIRED: 'admission_required'
} as const;

type StatusType = typeof Status[keyof typeof Status];

interface StatusResponse {
  status: StatusType;
  callId: string | null;
  updated_at: string;
}

class ScribeClient {
  private currentStatus: StatusType;
  private callId: string | null;
  private admissionRequested: boolean; // eslint-disable-line @typescript-eslint/no-unused-vars

  constructor() {
    this.currentStatus = Status.IDLE;
    this.callId = null;
    this.admissionRequested = false;
  }

  // Generate a random call ID
  private generateCallId(): string {
    return `call_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Simulate network latency
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get current status
  async status(): Promise<StatusResponse> {
    // Simulate network latency for status check
    await this.delay(750);

    return {
      status: this.currentStatus,
      callId: this.callId,
      updated_at: new Date().toISOString()
    };
  }

  // Start note-taking
  async start(): Promise<StatusResponse> {
    // Simulate network latency for start operation
    await this.delay(750);

    // Simulate different scenarios
    const scenarios = ['success', 'admission_required'];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    if (scenario === 'admission_required') {
      this.currentStatus = Status.ADMISSION_REQUIRED;
      this.admissionRequested = true;
      this.callId = this.generateCallId();

      return {
        status: this.currentStatus,
        callId: this.callId,
        updated_at: new Date().toISOString()
      };
    }

    this.currentStatus = Status.RECORDING;
    this.callId = this.generateCallId();
    this.admissionRequested = false;

    return {
      status: this.currentStatus,
      callId: this.callId,
      updated_at: new Date().toISOString()
    };
  }

  // Stop note-taking
  async stop(): Promise<StatusResponse> {
    // Simulate network latency for stop operation
    await this.delay(750);

    this.currentStatus = Status.IDLE;
    const _previousCallId = this.callId; // eslint-disable-line @typescript-eslint/no-unused-vars
    this.callId = null;
    this.admissionRequested = false;

    return {
      status: this.currentStatus,
      callId: null,
      updated_at: new Date().toISOString()
    };
  }

  // Admit Scribe to call (resolves admission requirement)
  async admitScribe(): Promise<StatusResponse> {
    // Simulate network latency for admission operation
    await this.delay(750);

    if (this.currentStatus === Status.ADMISSION_REQUIRED) {
      this.currentStatus = Status.RECORDING;
      this.admissionRequested = false;

      return {
        status: this.currentStatus,
        callId: this.callId,
        updated_at: new Date().toISOString()
      };
    }

    return {
      status: this.currentStatus,
      callId: this.callId,
      updated_at: new Date().toISOString()
    };
  }
}

export default new ScribeClient();