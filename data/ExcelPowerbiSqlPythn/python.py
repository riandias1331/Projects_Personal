# pip install pandas sqlalchemy pymysql
import pandas as pd
from sqlalchemy import create_engine

# Conectar ao banco de dados SQL (exemplo com MySQL)
engine = create_engine("mysql+pymysql://usuario:senha@localhost/nome_do_banco")

# Extração de dados da tabela de vendas
query = "SELECT * FROM sales"
df = pd.read_sql(query, engine)

# Transformação: adicionar coluna de receita total
df["total_revenue"] = df["quantity"] * df["price"]

# Salvar o dataframe em um arquivo Excel para análise inicial
df.to_excel("sales_data.xlsx", index=False)
print("Dados exportados para 'sales_data.xlsx'")
