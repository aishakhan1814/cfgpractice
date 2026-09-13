import app from './src/server.js';

async function runTests() {
  // Let the server start
  await new Promise(r => setTimeout(r, 1000));

  console.log('Testing endpoints...');

  const endpoints = [
    'http://localhost:5000/api/health',
    'http://localhost:5000/api/dashboard',
    'http://localhost:5000/api/dashboard/metrics',
    'http://localhost:5000/api/beneficiaries',
    'http://localhost:5000/api/beneficiaries/ben-001',
    'http://localhost:5000/api/volunteers',
    'http://localhost:5000/api/activities',
  ];

  for (const url of endpoints) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed GET ${url}: ${res.status}`);
    }
    const data = await res.json();
    console.log(`✓ GET ${url} (${Array.isArray(data) ? data.length + ' items' : 'OK'})`);
  }

  // Test POST Interaction
  const postRes = await fetch('http://localhost:5000/api/beneficiaries/ben-001/interactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'phone_call',
      date: '2026-09-13',
      notes: 'Test call verification: beneficiary is doing well.',
      loggedBy: 'Coordinator Maya',
      newStatus: 'active',
    }),
  });

  if (!postRes.ok) {
    throw new Error(`Failed POST interaction: ${postRes.status}`);
  }
  const postData = await postRes.json();
  console.log(`✓ POST /api/beneficiaries/ben-001/interactions: New status = ${postData.beneficiary.status}, daysSinceContact = ${postData.beneficiary.daysSinceContact}`);

  // Test PATCH Status
  const patchRes = await fetch('http://localhost:5000/api/beneficiaries/ben-001/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'needs_attention',
      reason: 'Automated test check',
    }),
  });

  if (!patchRes.ok) {
    throw new Error(`Failed PATCH status: ${patchRes.status}`);
  }
  const patchData = await patchRes.json();
  console.log(`✓ PATCH /api/beneficiaries/ben-001/status: Updated status = ${patchData.status}`);

  console.log('\n🎉 ALL 9 BACKEND ENDPOINT TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
