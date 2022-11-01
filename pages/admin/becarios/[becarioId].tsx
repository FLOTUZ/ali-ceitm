import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import {
  BecarioWithRelations,
  useBecarioByIdWithRelationsQuery,
} from "gql/generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

const BecarioId = () => {
  const router = useRouter();
  const [becario, setBecario] = useState<BecarioWithRelations | null>();

  const { becarioId } = router.query;

  const { data, loading, error } = useBecarioByIdWithRelationsQuery({
    variables: {
      id: Number(becarioId),
    },

    onCompleted(data) {
      setBecario(data.becarioByIdWithRelations);
    },
  });

  if (loading) {
    return <LoaderComponent />;
  }

  if (data?.becarioByIdWithRelations == null) {
    return (
      <ErrorComponent
        message={`Not found - Becario ${becarioId} no encontrado`}
      />
    );
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return <div>{becario?.persona?.nombres}</div>;
};

export default BecarioId;
