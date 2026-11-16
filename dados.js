/* ==========================================================================
   DADOS DOS IMÓVEIS — editar só aqui. Vale para a página inicial e para as
   páginas de cada casa (atlanticusguarida.pt/t2-silveira/, /t1-silveira/).

   - estado: etiquetas mostradas por cima do título (a primeira fica cheia).
   - pagina: nome da pasta da página própria da casa (deixe '' se não tiver).
   - exclusivo: enquanto a data "ate" não passar, os pedidos seguem para a
     mediadora e o contacto direto não aparece. Depois dessa data, a ficha
     passa sozinha a mostrar o contacto direto. Se a exclusividade for
     renovada, basta mudar a data. Cole o endereço do anúncio em "anuncio".
   - lista: 'venda' (imóveis à venda) ou 'gestao' (em arrendamento).
   - Para tirar um imóvel do site, ponha visivel:false. A página própria
     passa a dizer que a casa já não está disponível.
   - ATENÇÃO: se mudar o preço, mude-o também na descrição de partilha
     (linha og:description) da página própria da casa.
   - ATENÇÃO: as fichas em texto simples (blocos "estatico" no HTML, lidos
     pelos motores de busca e pelas IA) e o llms.txt não se atualizam sozinhos.
     Depois de mudar preços ou dados, peça ao Claude para os regenerar.
   ========================================================================== */
var IMOVEIS = [
  {
    id:'t2', visivel:true, lista:'venda', pagina:'t2-silveira',
    titulo:'Moradia T2', local:'Silveira, Lajes do Pico', preco:'239.000 €',
    estado:['À venda','Arrendada'],
    dados:[['Área útil','85 m²'],['Área bruta','209 m²'],['Lote','716 m²'],['Construção','1939, transformada em 2025'],['Obras','Nenhuma a fazer'],['Classe energética','C']],
    desc:'Cozinha e sala em espaço aberto, dois quartos, uma casa de banho, arrecadação na cave, terraço e estacionamento privado. Numa quinta com laranjeiras, tangerineiras, mangueiras, abacateiros e corações-negros, numa rua secundária e sossegada, com a Montanha do Pico à vista.',
    fotos:['t2-1','t2-2','t2-7','t2-3','t2-4','t2-5','t2-6'],
    exclusivo:null
  },
  {
    id:'t1', visivel:true, lista:'venda', pagina:'t1-silveira',
    titulo:'Moradia T1', local:'Silveira, Lajes do Pico', preco:'179.000 €',
    estado:['À venda','Arrendada'],
    dados:[['Área útil','70 m²'],['Área bruta','84 m²'],['Lote','860 m²'],['Construção','Casa de pedra, transformada em 2025'],['Obras','Nenhuma a fazer'],['Classe energética','C'],['Alojamento local','Registo RRAL n.º 5868']],
    desc:'Casa tradicional de pedra em dois pisos, com as vigas de madeira à vista, cozinha equipada, quarto, casa de banho, alpendre coberto e estacionamento. Na mesma quinta de árvores de fruto, com a Montanha do Pico à vista da janela.',
    fotos:['t1-1','t1-2','t1-8','t1-3','t1-4','t1-5','t1-6','t1-7'],
    exclusivo:{mediadora:'IAD Portugal', ate:'2027-01-31', anuncio:''}
  },
  {
    id:'t2-lajes', visivel:true, lista:'gestao', pagina:'',
    titulo:'Apartamento T2', local:'Centro da vila, Lajes do Pico', preco:'',
    estado:['Arrendado'],
    dados:[['Área útil','90 m²'],['Construção','2017'],['Classe energética','B'],['Alojamento local','Registo RRAL n.º 1442']],
    desc:'Sala e cozinha em espaço aberto, dois quartos, casa de banho completa e ar condicionado, no centro da vila das Lajes do Pico.',
    fotos:['l0','l1','l2','l3','l4','l5','l6','l7','l8'],
    exclusivo:null
  }
];

/* Pares de transformação: [casa, nome da casa, espaço, ficheiro antes, ficheiro depois] */
var PARES = [
  ['t1','Moradia T1','Fachada para a rua','antes-1','depois-1'],
  ['t1','Moradia T1','Cozinha','antes-3','depois-3'],
  ['t1','Moradia T1','Casa de banho','antes-4','depois-4'],
  ['t2','Moradia T2','Fachada','antes-5','depois-5'],
  ['t2','Moradia T2','Entrada e logradouro','antes-6','depois-6'],
  ['t2','Moradia T2','Cozinha','antes-7','depois-7']
];

var CONTACTO = { email:'geral@atlanticusguarida.pt', whatsapp:'351919534748' };
