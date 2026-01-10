// Final Verification Script for AI SecOps Course Deployment
// Run this in your browser console after deployment to verify all content is reachable

console.log('=== AI SecOps Course - Final Verification ===');

// Test 1: Check if CSS is loading
const testCSS = () => {
  const testElement = document.querySelector('.css-test');
  if (testElement) {
    const computedStyle = window.getComputedStyle(testElement);
    const bgColor = computedStyle.backgroundColor;
    console.log('CSS Test Element Background Color:', bgColor);
    if (bgColor === 'rgb(255, 0, 0)') {
      console.log('✅ CSS is loading correctly');
      return true;
    } else {
      console.log('❌ CSS may not be loading properly');
      return false;
    }
  }
  return false;
};

// Test 2: Check if Tailwind classes are working
const testTailwind = () => {
  const bodyClasses = document.body.className;
  console.log('Body Classes:', bodyClasses);
  if (bodyClasses.includes('font-display') && bodyClasses.includes('bg-white')) {
    console.log('✅ Tailwind classes are applied');
    return true;
  } else {
    console.log('❌ Tailwind classes may not be working');
    return false;
  }
};

// Test 3: Check if required DOM elements exist
const testDOMElements = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('✅ Root element found');
    return true;
  } else {
    console.log('❌ Root element missing');
    return false;
  }
};

// Test 4: Check if assets directory exists (by attempting to access a known asset)
const testAssets = async () => {
  try {
    const response = await fetch('/assets/index-CYuFw1Xy.css');
    if (response.ok) {
      console.log('✅ Assets directory is accessible');
      return true;
    } else {
      console.log('❌ Assets directory not accessible');
      return false;
    }
  } catch (error) {
    console.log('❌ Error accessing assets:', error);
    return false;
  }
};

// Test 5: Check if course data can be fetched
const testCourseData = async () => {
  try {
    const response = await fetch('/data/course.json');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Course data accessible:', data.courseTitle);
      return true;
    } else {
      console.log('❌ Course data not accessible');
      return false;
    }
  } catch (error) {
    console.log('❌ Error fetching course data:', error);
    return false;
  }
};

// Run all tests
const runVerification = async () => {
  console.log('\n--- Running Verification Tests ---');
  
  const cssResult = testCSS();
  const tailwindResult = testTailwind();
  const domResult = testDOMElements();
  const assetsResult = await testAssets();
  const courseDataResult = await testCourseData();
  
  console.log('\n--- Verification Results ---');
  console.log('CSS Loading:', cssResult ? '✅ PASS' : '❌ FAIL');
  console.log('Tailwind Classes:', tailwindResult ? '✅ PASS' : '❌ FAIL');
  console.log('DOM Elements:', domResult ? '✅ PASS' : '❌ FAIL');
  console.log('Assets Access:', assetsResult ? '✅ PASS' : '❌ FAIL');
  console.log('Course Data:', courseDataResult ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = cssResult && tailwindResult && domResult && assetsResult && courseDataResult;
  console.log('\n--- Overall Result ---');
  console.log(allPassed ? '🎉 ALL TESTS PASSED - Ready for teaching!' : '⚠️ Some tests failed - Check deployment');
  
  return allPassed;
};

// Execute verification
runVerification();

// Also log some helpful information
console.log('\n--- Helpful Debugging Info ---');
console.log('Current URL:', window.location.href);
console.log('Base Path:', import.meta.env.BASE_URL || '/');
console.log('Available CSS:', [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.href));