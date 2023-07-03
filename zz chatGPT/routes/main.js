const express = require('express');
const router = express.Router();

// BMI 계산을 처리하는 라우트
router.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight && height) {
    const bmi = weight / Math.pow(height / 100, 2);
    const result = `당신의 BMI 지수는 ${bmi.toFixed(2)}입니다.`;
    res.status(200).json({ result });
  } else {
    res.status(400).json({ error: '체중과 키를 입력하세요.' });
  }
});

module.exports = router;
