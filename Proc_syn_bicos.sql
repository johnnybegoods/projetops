CREATE OR ALTER PROCEDURE SyncBicos @id INT, @desc VARCHAR(50), @num INT
AS
	IF NOT EXISTS(select id from bico where id = @id)
	BEGIN
		INSERT INTO bico(id, DescricaoCombustivel, Numero) VALUES(@id, @desc, @num)
	END
