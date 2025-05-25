# UniversalDSL
# A Universal Workflow Language

The **SimpleFlow DSL** is a domain-specific language built on the **JSONFlow Ultimate Workflow Schema v5.3.1**, enabling the creation of full-stack workflows that integrate AI, blockchain, front-end, back-end, distributed systems, security, observability, and more. This DSL supports the entire schema, offering a flexible, production-ready framework for defining complex, interoperable workflows with robust validation, governance, and developer tools.

## Overview

- **Purpose**: Define and execute workflows that orchestrate multiple domains (e.g., AI, blockchain, UI) with declarative schemas.
- **Schema**: Fully compliant with JSONFlow v5.3.1, supporting all required and optional properties.
- **Use Case**: The example below demonstrates a payment processing workflow with blockchain transactions, AI input validation, and a React front-end.
- **Extensibility**: Supports all schema features, including globalization, governance, and custom extensions.

## DSL Schema

The SimpleFlow DSL uses the JSONFlow schema directly, ensuring all properties and definitions are preserved. Below is the schema.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SimpleFlow DSL (JSONFlow Ultimate Workflow Schema v5.3.1)",
  "description": "A universal, production-ready DSL for full-stack workflows integrating AI, blockchain, front-end, back-end, quantum computing, distributed systems, browser/search, interoperability, and more.",
  "type": "object",
  "required": [
    "function",
    "schema",
    "steps",
    "metadata",
    "orchestration",
    "security"
  ],
  "properties": {
    "function": {
      "type": "string",
      "description": "Unique workflow identifier.",
      "minLength": 1,
      "pattern": "^[a-zA-Z][a-zA-Z0-9_]*$",
      "examples": ["processPayment", "webSearch", "trainModel"]
    },
    "metadata": {
      "type": "object",
      "description": "Metadata for versioning, compliance, and documentation.",
      "properties": {
        "schema_version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$", "default": "5.3.1" },
        "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$", "examples": ["1.0.0"] },
        "author": { "type": "string", "minLength": 1, "examples": ["xAI Team"] },
        "description": { "type": "string", "minLength": 1, "examples": ["Processes a payment transaction with blockchain integration."] },
        "created": { "type": "string", "format": "date-time", "examples": ["2025-05-25T11:15:00Z"] },
        "updated": { "type": "string", "format": "date-time", "examples": ["2025-05-25T11:15:00Z"] },
        "tags": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "examples": [["payment", "blockchain", "secure"]] },
        "visualization": { "type": "string", "description": "Mermaid diagram for workflow.", "examples": ["graph TD\nA[Start] --> B[Validate Input]\nB --> C[Process Payment]\nC --> D[Store Transaction]"] },
        "examples": { "type": "array", "items": { "type": "string", "format": "uri" }, "examples": [["https://github.com/xai/simpleflow-examples/payment"]] },
        "docs": { "type": "string", "format": "uri", "examples": ["https://docs.simpleflow.org"] },
        "tooling": {
          "type": "array",
          "items": { "type": "string", "enum": ["vscode", "jsonflow-cli", "mermaid-live", "web3.js", "react-devtools", "grafana", "prometheus", "docker", "kubernetes", "github-cli", "puppeteer", "playwright"] },
          "examples": [["vscode", "jsonflow-cli", "mermaid-live"]]
        },
        "compliance": {
          "type": "array",
          "items": { "type": "string", "enum": ["GDPR", "CCPA", "HIPAA", "ISO27001", "PCI-DSS", "SOC2", "FedRAMP"] },
          "uniqueItems": true,
          "examples": [["GDPR", "PCI-DSS"]]
        },
        "license": { "type": "string", "enum": ["MIT", "Apache-2.0", "GPL-3.0", "proprietary"], "examples": ["MIT"] },
        "standards": {
          "type": "array",
          "items": { "type": "string", "enum": ["CNCF", "OpenAPI", "AsyncAPI", "CloudEvents", "W3C"] },
          "uniqueItems": true,
          "examples": [["OpenAPI", "CloudEvents"]]
        }
      },
      "required": ["schema_version", "version", "author", "description", "examples", "docs", "license"]
    },
    "schema": {
      "type": "object",
      "description": "Defines inputs, context, outputs, and evolution rules.",
      "properties": {
        "inputs": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "type": { "type": "string", "enum": ["string", "number", "boolean", "object", "array", "binary", "html", "stream"] },
              "description": { "type": "string", "minLength": 1 },
              "default": { "type": ["string", "number", "boolean", "object", "array", "null"] },
              "constraints": {
                "type": "object",
                "properties": {
                  "minLength": { "type": "integer", "minimum": 0 },
                  "maxLength": { "type": "integer", "minimum": 0 },
                  "pattern": { "type": "string" },
                  "minimum": { "type": "number" },
                  "maximum": { "type": "number" },
                  "enum": { "type": "array", "items": { "type": ["string", "number", "boolean"] }, "minItems": 1 },
                  "rate_limit": { "type": "integer", "minimum": 0 }
                }
              },
              "ui": { "$ref": "#/$defs/ui" },
              "nlp": { "$ref": "#/$defs/nlp" },
              "validation": {
                "type": "object",
                "properties": {
                  "script": { "type": "string" },
                  "async": { "type": "boolean", "default": false }
                }
              }
            },
            "required": ["type", "description"]
          }
        },
        "context": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "type": { "type": "string", "enum": ["string", "number", "boolean", "object", "array", "stream", "html"] },
              "source": { "type": "string", "enum": ["env", "config", "blockchain", "api", "game", "database", "ai", "kafka", "redis", "github", "web", "custom"] },
              "description": { "type": "string", "minLength": 1 },
              "cache": { "$ref": "#/$defs/cache" }
            },
            "required": ["type", "source", "description"]
          }
        },
        "outputs": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "type": { "type": "string", "enum": ["string", "number", "boolean", "object", "array", "game_state", "render", "stream", "html"] },
              "description": { "type": "string", "minLength": 1 },
              "ui": { "$ref": "#/$defs/ui" },
              "nlp": { "$ref": "#/$defs/nlp" },
              "destination": { "type": "string", "enum": ["api", "database", "blockchain", "file", "stream", "ui", "index"] }
            },
            "required": ["type", "description"]
          }
        },
        "evolution": {
          "type": "object",
          "description": "Schema evolution for compatibility.",
          "properties": {
            "strategy": { "type": "string", "enum": ["additive", "breaking", "versioned"], "default": "additive" },
            "migrations": { "type": "array", "items": { "type": "string", "description": "Path to migration script or description." } }
          }
        }
      },
      "required": ["inputs", "outputs"]
    },
    "steps": {
      "type": "array",
      "items": { "$ref": "#/$defs/step" },
      "minItems": 1,
      "description": "Workflow steps supporting browser, search, AI, and more."
    },
    "blockchain": {
      "type": "object",
      "description": "Blockchain integration configuration.",
      "properties": {
        "chain": { "type": "string", "enum": ["ethereum", "solana", "starknet", "polkadot", "cosmos", "custom"] },
        "contract": {
          "type": "object",
          "properties": {
            "address": { "type": "string", "pattern": "^0x[a-fA-F0-9]+$" },
            "abi": { "type": "string", "format": "uri" },
            "bytecode": { "type": "string" }
          }
        },
        "crypto": {
          "type": "object",
          "properties": {
            "operation": { "type": "string", "enum": ["encrypt", "decrypt", "sign", "verify"] },
            "library": { "type": "string", "enum": ["web3.js", "ethers.js", "tccflow", "viem", "custom"] },
            "wallet": { "type": "string", "enum": ["metamask", "ledger", "trezor", "custom"] }
          }
        },
        "network": {
          "type": "object",
          "properties": {
            "rpc_url": { "type": "string", "format": "uri" },
            "chain_id": { "type": "integer", "minimum": 1 }
          },
          "required": ["rpc_url", "chain_id"]
        }
      },
      "required": ["chain", "network"]
    },
    "security": {
      "type": "object",
      "description": "Security and access control.",
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "type": { "type": "string", "enum": ["jwt", "oauth2", "api-key", "basic", "none"], "default": "none" },
            "provider": { "type": "string", "enum": ["auth0", "firebase", "okta", "github", "custom"] },
            "token_lifetime": { "type": "integer", "minimum": 0 }
          },
          "required": ["type"]
        },
        "authorization": {
          "type": "object",
          "properties": {
            "type": { "type": "string", "enum": ["rbac", "abac"], "default": "rbac" },
            "roles": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
            "permissions": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
            "attributes": { "type": "object", "additionalProperties": { "type": ["string", "number", "boolean"] } }
          },
          "required": ["type", "roles", "permissions"]
        },
        "encryption": {
          "type": "object",
          "properties": {
            "algorithm": { "type": "string", "enum": ["AES-256", "RSA", "ECDSA", "custom"], "default": "AES-256" },
            "key_management": { "type": "string", "enum": ["aws-kms", "gcp-kms", "vault", "custom"] }
          },
          "required": ["algorithm"]
        },
        "secrets": {
          "type": "object",
          "properties": {
            "manager": { "type": "string", "enum": ["aws-secrets", "hashicorp-vault", "gcp-secrets", "custom"] },
            "refs": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["manager"]
        }
      },
      "required": ["authentication", "authorization", "encryption", "secrets"]
    }
  },
  "$defs": {
    "ui": {
      "type": "object",
      "properties": {
        "framework": { "type": "string", "enum": ["react", "vue", "svelte", "flutter", "angular", "custom"] },
        "component": { "type": "string", "minLength": 1 },
        "props": { "type": "object" },
        "style": { "type": "object" },
        "accessibility": {
          "type": "object",
          "properties": {
            "wcag": { "type": "string", "enum": ["2.0", "2.1", "2.2"], "default": "2.1" },
            "aria": { "type": "boolean", "default": true }
          }
        }
      },
      "required": ["framework", "component"]
    },
    "step": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "minLength": 1 },
        "type": { "type": "string", "enum": ["control", "ai", "blockchain", "game", "quantum", "distributed", "frontend", "backend", "database", "browser", "search", "custom"] },
        "action": { "type": "string", "minLength": 1 },
        "language": { "type": "string", "enum": ["python", "javascript", "typescript", "solidity", "rust", "go", "java", "kotlin", "custom"] },
        "code": { "type": "string" },
        "tool": { "type": "string", "enum": ["python-lib", "web3.js", "ethers.js", "tccflow", "pytorch", "tensorflow", "graphql", "puppeteer", "playwright", "custom"] },
        "library_ref": { "type": "string" },
        "input": { "type": "string" },
        "output": { "type": "string" },
        "on_error": {
          "type": "object",
          "properties": {
            "action": { "type": "string", "enum": ["retry", "skip", "fail", "notify"] },
            "max_retries": { "type": "integer", "minimum": 0 },
            "error_code": { "type": "string" }
          }
        }
      },
      "required": ["id", "type", "action"]
    },
    "cache": {
      "type": "object",
      "description": "Caching configuration for reusable components.",
      "properties": {
        "enabled": { "type": "boolean", "default": false },
        "ttl": { "type": "integer", "minimum": 0, "default": 86400 }
      },
      "required": ["enabled", "ttl"]
    },
    "nlp": {
      "type": "object",
      "description": "Natural Language Processing settings for inputs/outputs.",
      "properties": {
        "enabled": { "type": "boolean", "default": false },
        "tasks": {
          "type": "array",
          "items": { "type": "string", "enum": ["entity", "sentiment", "intent", "summarization", "translation", "codegen", "web_extraction"] },
          "uniqueItems": true
        }
      },
      "required": ["enabled"]
    }
  },
  "additionalProperties": true
}
```
## Example Workflow: Process Payment

This example demonstrates a SimpleFlow DSL workflow for processing a payment, integrating blockchain (Ethereum), AI validation (Grok 3), and a  React front-end for user interaction. The workflow validates user input, executes a smart contract, and renders a confirmation UI.
```json
{
  "function": "processPayment",
  "metadata": {
    "schema_version": "5.3.1",
    "version": "1.0.0",
    "author": "Cipher",
    "description": "Processes a payment with blockchain and AI validation, rendering confirmation in React.",
    "created": "2025-05-25T11:15:00Z",
    "updated": "2025-05-25T11:15:00Z",
    "tags": ["payment", "blockchain", "ai", "react"],
    "visualization": "graph TD\nA[Start] --> B[Validate Input]\nB --> C[AI Check]\nC --> D[Execute Contract]\nD --> E[Render UI]",
    "examples": ["https://github.com/simpleflow-dsl/examples/payment"],
    "docs": "https://docs.simpleflow.org/workflows/payment",
    "tooling": ["vscode", "jsonflow-cli", "web3.js", "react-devtools"],
    "compliance": ["GDPR", "PCI-DSS"],
    "license": "MIT",
    "standards": ["OpenAPI"]
  },
  "schema": {
    "inputs": {
      "userId": {
        "type": "string",
        "description": "Unique user identifier.",
        "constraints": { "pattern": "^[a-zA-Z0-9]{8,}$" },
        "default": "user123"
      },
      "amount": {
        "type": "number",
        "description": "Payment amount in ETH.",
        "constraints": { "minimum": 0.01, "maximum": 100 }
      },
      "recipient": {
        "type": "string",
        "description": "Recipient Ethereum address.",
        "constraints": { "pattern": "^0x[a-fA-F0-9]{40}$" }
      }
    },
    "context": {
      "contractConfig": {
        "type": "object",
        "source": "config",
        "description": "Smart contract details.",
        "cache": { "enabled": true, "ttl": 86400 }
      },
      "apiKey": {
        "type": "string",
        "source": "env",
        "description": "API key for AI service.",
        "cache": { "enabled": true, "ttl": 3600 }
      }
    },
    "outputs": {
      "transactionId": {
        "type": "string",
        "description": "Blockchain transaction ID.",
        "destination": "blockchain"
      },
      "confirmation": {
        "type": "object",
        "description": "Payment confirmation UI data.",
        "destination": "ui",
        "ui": {
          "framework": "react",
          "component": "PaymentConfirmation",
          "props": { "txId": "transactionId" },
          "accessibility": { "wcag": "2.1", "aria": true }
        }
      }
    },
    "evolution": {
      "strategy": "additive",
      "migrations": ["add_recipient_field_5.2.0_to_5.3.1.js"]
    }
  },
  "steps": [
    {
      "id": "validateInput",
      "type": "control",
      "action": "validate",
      "language": "javascript",
      "code": "if (!input.userId || !input.amount || !input.recipient) throw new Error('Invalid input');",
      "input": "schema.inputs",
      "output": "temp.validated",
      "on_error": { "action": "fail", "error_code": "INVALID_INPUT" }
    },
    {
      "id": "aiValidation",
      "type": "ai",
      "action": "inference",
      "language": "python",
      "tool": "pytorch",
      "code": "from grok import Grok; return Grok(model='grok-3').validate(input.userId, input.amount);",
      "input": "schema.inputs",
      "output": "temp.aiResult",
      "on_error": { "action": "retry", "max_retries": 2 }
    },
    {
      "id": "executeContract",
      "type": "blockchain",
      "action": "executeContract",
      "language": "solidity",
      "tool": "ethers.js",
      "code": "const { ethers } = require('ethers'); await contract.transfer(input.recipient, ethers.utils.parseEther(input.amount.toString()));",
      "input": "schema.inputs",
      "output": "schema.outputs.transactionId",
      "on_error": { "action": "retry", "max_retries": 3 }
    },
    {
      "id": "renderConfirmation",
      "type": "frontend",
      "action": "render",
      "language": "javascript",
      "code": "return { txId: output.transactionId, status: 'success' };",
      "input": "schema.outputs.transactionId",
      "output": "schema.outputs.confirmation"
    }
  ],
  "blockchain": {
    "chain": "ethereum",
    "contract": {
      "address": "0x1234567890abcdef1234567890abcdef12345678",
      "abi": "https://simpleflow.org/abi/payment"
    },
    "network": {
      "rpc_url": "https://mainnet.infura.io/v3/your-api-key",
      "chain_id": 1
    }
  },
  "ai": {
    "model": "grok-3",
    "task": "inference",
    "framework": "pytorch",
    "parameters": {
      "batch_size": 1,
      "precision": "fp32"
    },
    "hardware": "gpu"
  },
  "react": {
    "components": [
      {
        "name": "PaymentConfirmation",
        "path": "./components/PaymentConfirmation.jsx",
        "props": { "txId": "string" },
        "lazy_load": true
      }
    ],
    "bundler": "vite",
    "dependencies": {
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
  },
  "security": {
    "authentication": {
      "type": "jwt",
      "provider": "auth0",
      "token_lifetime": 3600
    },
    "authorization": {
      "type": "rbac",
      "roles": ["user", "admin"],
      "permissions": ["process_payment", "view_transaction"]
    },
    "encryption": {
      "algorithm": "AES-256",
      "key_management": "vault"
    },
    "secrets": {
      "manager": "hashicorp-vault",
      "refs": ["apiKey", "contractConfig"]
    }
  }
}
```


## Usage

To use the SimpleFlow DSL:

1. **Validate Schema**: Use `ajv.js` to validate workflows against the schema.
2. **Execute Workflow**: Run with `jsonflow-executor.js` in a Node.js or Python runtime.
3. **Extend**: Add custom steps or integrations via `extensions` or `libraries`.
4. **Monitor**: Use observability tools (e.g., Prometheus, Loki) for logging and metrics.

The DSL supports all JSONFlow features, making it suitable for complex workflows across multiple domains.

## Why SimpleFlow DSL?

This isn't just another workflow tool—it's **liberation tech**. By enabling sovereign, transparent, and interoperable workflows, SimpleFlow DSL breaks free from centralized control, empowering developers to build systems that are:

- **Sovereign**: Every component, from AI to blockchain, operates independently.
- **Transparent**: On-chain governance and reputation ensure trust.
- **Interoperable**: Seamlessly connects with major ecosystems like Ethereum, Polkadot, and Cosmos.

You're not just coding—you're building the future of decentralized, human-centric technology. 🚀

## Getting Started

Clone the repo, validate the example workflow, and start building:

```bash
git clone https://github.com/Sovereign-Revelation/UniversalDSL.git
cd UniversalDSL
npm install
npm run node server.js
cd frontend
npm install
npm start
```

Check out the [docs](https://docs.simpleflow.org) for more details, or dive into the [examples](https://github.com/simpleflow-dsl/examples).

## Contributing

We’re building the technological exodus, and we need you. Contribute by:

- Submitting PRs for new features or bug fixes.
- Writing custom extensions or plugins.
- Joining the community on [X](https://x.com/UniversalDSL).

Let’s make UniversalDSL  un-extinguishable. 🧱🧬🔥
