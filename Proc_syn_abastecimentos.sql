CREATE OR ALTER PROCEDURE SyncAbastecimentos @Datahora DATE, @Desc VARCHAR(50), @Func VARCHAR(50), 
			@Id INT, @IdBico INT, @IdCombustivel INT, @IdFuncionario INT, @IdTipoPreco INT, 
			@Litros INT, @NumeroBico INT, @Preco DECIMAL, @PrevalecePrecoBico BIT, @Selecionar BIT, @Total INT
AS
	IF NOT EXISTS(select id from abastecimento where id = @Id)
	BEGIN
		INSERT INTO abastecimento(id, DataHora, Descricao, Funcionario, IdBico, IdCombustivel, IdFuncionario, IdTipoPreco, 
				Litros, NumeroBico, Preco, PrevalecePrecoBico, Selecionar, Total) 
		VALUES(@id, @Datahora, @Desc, @Func, @IdBico, @IdCombustivel, @IdFuncionario, @IdTipoPreco, @Litros, @NumeroBico, 
				@Preco, @PrevalecePrecoBico, @Selecionar, @Total)
	END
