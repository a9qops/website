 
import { encrypt } from '../src/lib/auth';

async function testMutation() {
  console.log("--- MUTATION SECURITY TEST ---");

  // 1. Unauthenticated Request
  let res = await fetch('http://localhost:3000/api/test-auth', {
    method: 'POST',
    body: JSON.stringify({ action: 'create_test_project' })
  });
  console.log("Unauthenticated response status:", res.status);
  console.log("Unauthenticated denied:", res.status === 401);

  // 2. Authenticated Request
  const token = await encrypt({ userId: "test-user-id" });
  res = await fetch('http://localhost:3000/api/test-auth', {
    method: 'POST',
    headers: {
      'Cookie': `session=${token}`
    },
    body: JSON.stringify({ action: 'create_test_project' })
  });
  console.log("Authenticated response status:", res.status);
  console.log("Authenticated allowed:", res.status === 200);
}

testMutation().catch(console.error);
