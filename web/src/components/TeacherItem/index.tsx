import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
        <header>
            <img src="https://avatars3.githubusercontent.com/u/55953657?s=460&u=006397411f50a7eec2365bcfe774dd029fc14156&v=4" alt="Foto Professor" />
            <div>
                <strong>Otacílio Gomes</strong>
                <span>Química</span>
            </div>
        </header>
        <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br/><br/>
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
        </p>

        <footer>
            <p>Preço/hora<strong>R$ 80,00</strong></p>
            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato.
            </button>
        </footer>
    </article>
  )
}

export default TeacherItem;