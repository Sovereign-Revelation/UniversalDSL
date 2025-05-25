// Auto-generated routes for universal schema
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ultimateController');

router.get('/function', controller.getFunction);
router.get('/metadata', controller.getMetadata);
router.get('/schema', controller.getSchema);
router.get('/steps', controller.getSteps);
router.get('/libraries', controller.getLibraries);
router.get('/browser', controller.getBrowser);
router.get('/search', controller.getSearch);
router.get('/interop', controller.getInterop);
router.get('/state', controller.getState);
router.get('/security', controller.getSecurity);
router.get('/observability', controller.getObservability);
router.get('/developer', controller.getDeveloper);
router.get('/data', controller.getData);
router.get('/globalization', controller.getGlobalization);
router.get('/governance', controller.getGovernance);
router.get('/lifecycle', controller.getLifecycle);
router.get('/ecosystem', controller.getEcosystem);
router.get('/orchestration', controller.getOrchestration);
router.get('/nlp', controller.getNlp);
router.get('/ai', controller.getAi);
router.get('/blockchain', controller.getBlockchain);
router.get('/react', controller.getReact);
router.get('/quantum', controller.getQuantum);
router.get('/performance', controller.getPerformance);
router.get('/config', controller.getConfig);
router.get('/access_policy', controller.getAccess_policy);
router.get('/invariants', controller.getInvariants);
router.get('/tests', controller.getTests);
router.get('/extensions', controller.getExtensions);
router.get('/ci_cd', controller.getCi_cd);

module.exports = router;
