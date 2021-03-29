const replace = require('replace-in-file');

const pkgOptions = {
  files: 'package.json',
  from: /"version": "(.*)",/g,
  to: `"version": "${process.argv[2]}",`,
};

const chartOptions = {
  files: 'rapid-test-dashboard/Chart.yaml',
  from: /appVersion: "prod-(.*)"/g,
  to: `appVersion: "prod-${process.argv[2]}"`,
};

const bumpPackage = async () => {
  try {
    const results = await replace(pkgOptions);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const bumpChart = async () => {
  try {
    const results = await replace(chartOptions);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

bumpPackage();
bumpChart();
