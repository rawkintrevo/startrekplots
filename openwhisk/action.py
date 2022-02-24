from transformers import GPT2LMHeadModel, GPT2Tokenizer, GPT2Config



def main(params):

    def next_line(s):
        print(f"next_line({s})")
        tokenizer = GPT2Tokenizer.from_pretrained('gpt2', bos_token='<|startoftext|>', eos_token='<|endoftext|>', pad_token='<|pad|>')
        configuration = GPT2Config.from_pretrained('gpt2', output_hidden_states=False)
        configuration.max_length = 1024
        configuration.vocab_size = 50259
        input_ids = tokenizer.encode(s, return_tensors='pt')
        model = GPT2LMHeadModel.from_pretrained("/", config=configuration)
        model.resize_token_embeddings(len(tokenizer))
        sample_outputs = model.generate(
            input_ids,
            do_sample=True,
            top_k=50,
            max_length = 800,
            top_p=0.95,
            num_return_sequences=1
        )
        return [(i, tokenizer.decode(sample_output, skip_special_tokens=True)) for i, sample_output in enumerate(sample_outputs)]

    #
    seed = params.get('seed')
    print(f"Recieved input: {seed}")
    # acts = make_acts(seed)
    # print('acts final')
    # print(acts)
    # output = "\n---Act Break---\n".join(acts)
    # print(f"output: {output}")
    output = next_line(seed)
    return {"output": output}
    # return ({'keys': ",".join(list(params.keys())),
    #          'params': params})


