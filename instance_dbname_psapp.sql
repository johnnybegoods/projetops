CREATE TABLE bico(
	Id INT NOT NULL,
	DescricaoCombustivel VARCHAR(50) NOT NULL,
	Numero INT NOT NULL,
	PRIMARY KEY(id));

CREATE TABLE abastecimento(
	Id INT NOT NULL,
	DataHora DATE NOT NULL,
	Descricao VARCHAR(50) NOT NULL,
	Funcionario VARCHAR(50) NOT NULL,
	IdBico INT NOT NULL,
	IdCombustivel INT NULL,
	IdFuncionario INT NOT NULL,
	IdTipoPreco INT NOT NULL,
	Litros INT NOT NULL,
	NumeroBico INT NOT NULL,
	Preco DECIMAL NOT NULL,
	PrevalecePrecoBico BIT NOT NULL,
	Selecionar BIT NOT NULL,
	Total DECIMAL NOT NULL
	PRIMARY KEY(id),
	FOREIGN KEY(IdBico) REFERENCES bico(Id)
);
CREATE OR ALTER PROCEDURE SyncBicos @id INT, @desc VARCHAR(50), @num INT
AS
	IF NOT EXISTS(select id from bico where id = @id)
	BEGIN
		INSERT INTO bico(id, DescricaoCombustivel, Numero) VALUES(@id, @desc, @num)
	END
