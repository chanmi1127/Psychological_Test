import React from 'react';
import { Table } from 'react-bootstrap';

const styleDiv = {
    fontSize: "1.25rem",
    fontWeight: "400",
    width: "auto",
    justifyContent: "center",
    padding: "1em"
};

function TestResultJobValues() {
    return (
        <div style={styleDiv}>
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">능력발휘</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">특징</th>
                        <td>나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.</td>
                    </tr>
                    <tr>
                        <th scope="row">직업선택</th>
                        <td>나는 나의 능력을 충분히 발휘할 수 있는 기회와 가능성이 주어지는 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 직업생활에서의 경쟁은 나를 도전적으로 만들어주고, 어려운 일을 하나씩 해결해 나가는 과정에서 성취감을 느낄 것 입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">자율성</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 어떤 일을 할 때 규칙, 절차, 시간 등을 스스로 결정하길 원합니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 다른 것보다 일하는 방식과 스타일이 자유로운 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td>나만의 방식에 맞게 자율적으로 일할 때 나의 능력을 더욱 효과적으로 발휘할 수 있습니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">보수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나의 충분한 경제적 보상이 매우 중요하다고 생각합니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나의 노력과 성과에 대해 충분한 경제적 보상이 주어지는 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 충분한 보수를 받는다면 일의 어려움과 힘겨움에 관계없이 최선을 다해 노력할 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">안정성</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 매사가 계획한대로 안정적으로 유지되는 것을 좋아합니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 쉽게 해고되지 않고 오랫동안 일할 수 있는 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 안정적인 직업생활이 보장된다면 편안한 마음으로 더욱 열심히 일을 할 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">사회적인정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 다른 사람들로부터 나의 능력과 성취를 충분히 인정받고 싶어합니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 많은 사람들로부터 주목받고 인정받을 수 있는 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 주변사람들이 나를 긍정적으로 평가하면 나의 능력발휘에 더욱 도움이 될 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">사회봉사</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 다른 사람을 돕고 더 나은 세상을 만들고 싶습니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 사람, 조직, 국가, 인류에 대한 봉사와 기여가 가능한 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 도움과 격려가 필요한 사람들에게 힘을 줄 수 있는 직업생활을 할 때 가치와 보람을 느낄 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">자기계발</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 항상 새로운 것을 배우고 스스로 발전해 나갈 때 만족을 느낍니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 나의 능력과 소질을 지속적으로 발전시킬 수 있는 직업을 선택할 것입니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 나 스스로가 발전할 수 있는 기회가 충분히 주어지는 직업생활을 할 때 만족감을 느낄 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">창의성</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> 특징</th>
                        <td> 나는 예전부터 해오던 것 보다는 새로운 것을 만들어 내는 것을 매우 좋아합니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업선택</th>
                        <td> 나는 늘 변화하고 혁신적인 아이디어를 내며, 창조적인 시도를 하는 직업을 선택하고 싶습니다.</td>
                    </tr>
                    <tr>
                        <th scope="row"> 직업생활</th>
                        <td> 나는 새롭고 독창적인 것을 만들어 내는 과정에서 능력을 충분히 발휘할 수 있을 것입니다.</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    );
}

export default TestResultJobValues;