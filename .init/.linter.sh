#!/bin/bash
cd /home/kavia/workspace/code-generation/user-initiated-react-application-with-optional-database-ff9b60ea/frontend_reactjs
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

