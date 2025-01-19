set -x;
kill -9 $(lsof -t -i:58001);
kill -9 $(lsof -t -i:58000);