#!/bin/bash

echo "🛠️  Starting JsonFlow DSL Build Process..."
LOG_DIR="./logs"
mkdir -p "$LOG_DIR"

COMBINED_LOG="$LOG_DIR/combined.log"
ERROR_LOG="$LOG_DIR/error.log"

# Empty logs before run
> "$COMBINED_LOG"
> "$ERROR_LOG"

run_step() {
  echo "▶️ $1..."
  echo ">>> $1" >> "$COMBINED_LOG"
  node "$2" >> "$COMBINED_LOG" 2>> "$ERROR_LOG"

  if [ $? -ne 0 ]; then
    echo "❌ $1 failed. Check $ERROR_LOG"
    exit 1
  else
    echo "✅ $1 completed"
  fi
}

run_step "Compiling Schemas" "./compiler/compileSchemas.js"
run_step "Generating Controllers" "./compiler/generateControllers.js"
run_step "Generating Frontend Components" "./compiler/generateFrontendComponents.js"
run_step "Generating API Routes" "./compiler/generateRoutes.js"

echo "🎉 JsonFlow DSL Build Completed Successfully"