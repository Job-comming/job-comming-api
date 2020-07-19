'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feed', [{
      writer_id: '3',
      content: '안녕하세요, 현재 스타트업에서 풀스택 개발자로 1년 동안 일해본 이진섭입니다. 비록 경험은 짧지만 좋은 사수분덕분에 빨리 개발환경에 적응했고, 여러 오픈소스에 프로젝트에 참여해보면서 배우려고 노력했습니다. 혹시 스타트업 같은데 취직하셔서 사수가 없으시거나 현직 개발자들에게 풀스택 쪽으로 지도 받고 싶은 멘티 분을 찾습니다.',
      type: '멘티모집',
      tag: 'fullstack, frontend, backend'
    }, {
      writer_id: '2',
      content: '안녕하세요, 학부 동안 머신러닝을 중점적으로 공부해온 김수아입니다. 깊이 있는 지도는 어렵겠지만 초보시라면 멘토링을 도와드릴 수 있을 것 같습니다. 저도 대학에서 뿐만 아니라 온라인 오픈코스웨어도 이용해본 경험이 있어서 도움을 줄 수 있을까 해서 포스팅 해봅니다.',
      type: '멘티모집',
      tag: 'machine learning, python, tensorflow'
    }, {
      writer_id: '4',
      content: '안녕하세요, 2년째 안드로이드 개발자로 일해온 박혜원입니다. 최근 들어 웹개발에 관심이 생겨서 독학을 하려고 하는데 자료들 추천을 받고, 개인 프로젝트 코드리뷰를 받고 싶어서 글을 올립니다. 아직 초창기 이어서 연차는 적어도, 대학에서 웹개발을 중점적으로 배워본 분에게도 멘토링을 받을 수 있을 것 같습니다.',
      type: '멘토구함',
      tag: 'frontend, backend, fullstack'
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feed', null, {})
  }
};
